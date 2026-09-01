/**
 * AI Routes - Proxy to Google Gemini API
 * Handles secure server-side calls to Google AI without exposing API key to client
 */

import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

/**
 * Type definitions
 */
interface GenerateRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

interface GenerateResponse {
  text: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  error?: string;
}

/**
 * Helper: Call Google Gemini API via @google/genai
 */
async function callGeminiAPI(
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  }
): Promise<GenerateResponse> {
  try {
    // Import dynamically to avoid issues if package not installed
    const { GoogleGenerativeAI } = await import('@google/genai');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        text: '',
        model: options?.model || 'gemini-2.0-flash',
        error: 'GEMINI_API_KEY not configured',
      };
    }

    const client = new GoogleGenerativeAI({ apiKey });
    const model = options?.model || process.env.GEMINI_MODEL || 'gemini-2.0-flash';

    const systemPrompt = options?.systemPrompt || '';

    // Build request
    const requestBody: any = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: options?.maxTokens || 2048,
        temperature: options?.temperature ?? 0.7,
      },
    };

    if (systemPrompt) {
      requestBody.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    // Call API (adjust method based on @google/genai version)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return {
        text: '',
        model,
        error: `Gemini API error: ${response.status} - ${error}`,
      };
    }

    const data = await response.json() as any;

    // Extract text from response
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    return {
      text,
      model,
      usage: {
        inputTokens: data.usageMetadata?.promptTokenCount || 0,
        outputTokens: data.usageMetadata?.candidatesTokenCount || 0,
      },
    };
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return {
      text: '',
      model: options?.model || 'gemini-2.0-flash',
      error: `Failed to call Gemini: ${error.message}`,
    };
  }
}

/**
 * POST /api/ai/generate
 * Generate text using Gemini
 */
router.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, model, maxTokens, temperature, systemPrompt } =
      req.body as GenerateRequest;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'prompt is required and must be a string' });
      return;
    }

    const result = await callGeminiAPI(prompt, {
      model,
      maxTokens,
      temperature,
      systemPrompt,
    });

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(result);
  } catch (error: any) {
    console.error('AI route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/ai/stream
 * Stream text generation (if supported by client needs)
 */
router.post('/stream', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, model, systemPrompt } = req.body as GenerateRequest;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'prompt is required' });
      return;
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Since we're using simple fetch, we'll send the full response as one chunk
    // For true streaming, consider using server-sent events with Gemini streaming endpoint
    const result = await callGeminiAPI(prompt, { model, systemPrompt });

    if (result.error) {
      res.write(`data: ${JSON.stringify({ error: result.error })}\n\n`);
      res.end();
      return;
    }

    res.write(`data: ${JSON.stringify(result)}\n\n`);
    res.end();
  } catch (error: any) {
    console.error('AI stream route error:', error);
    res.end();
  }
});

/**
 * POST /api/ai/batch
 * Process multiple prompts in batch (cost-efficient)
 */
router.post('/batch', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompts, model, systemPrompt } = req.body as {
      prompts: string[];
      model?: string;
      systemPrompt?: string;
    };

    if (!Array.isArray(prompts) || prompts.length === 0) {
      res.status(400).json({ error: 'prompts array is required' });
      return;
    }

    // Limit batch size to prevent abuse
    if (prompts.length > 10) {
      res.status(400).json({ error: 'Maximum 10 prompts per batch request' });
      return;
    }

    // Process in parallel with rate limiting (wait between calls)
    const results = await Promise.all(
      prompts.map((prompt, index) =>
        new Promise<GenerateResponse>((resolve) => {
          setTimeout(async () => {
            const result = await callGeminiAPI(prompt, { model, systemPrompt });
            resolve(result);
          }, index * 200); // 200ms between requests
        })
      )
    );

    res.json({ results });
  } catch (error: any) {
    console.error('AI batch route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/ai/health
 * Health check endpoint
 */
router.get('/health', (_req: Request, res: Response): void => {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: hasGeminiKey ? 'ok' : 'missing_key',
    geminiConfigured: hasGeminiKey,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  });
});

export default router;
