/**
 * Multi-Provider AI Router
 *
 * Abstraction layer that routes AI requests to the configured provider:
 * - "gemini" (default): Direct Google GenAI SDK
 * - "mr-router": MR Multi Model AI Coder router (Claude, Qwen, Qoder models)
 * - "auto": Try MR Router first, fallback to Gemini
 *
 * Environment variables:
 *   AI_PROVIDER       — "gemini" | "mr-router" | "auto" (default: "gemini")
 *   MR_ROUTER_ENDPOINT — MR Router API base URL
 *   MR_ROUTER_API_KEY  — MR Router auth token (sk-mr-auth-...)
 *   GEMINI_API_KEY     — Google Gemini API key (fallback / direct mode)
 */

export type AIProvider = "gemini" | "mr-router" | "auto";

export interface AIRequestOptions {
  prompt: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  provider: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
}

function getProvider(): AIProvider {
  const p = (process.env.AI_PROVIDER || "gemini").toLowerCase().trim();
  if (p === "mr-router" || p === "mrrouter" || p === "mr") return "mr-router";
  if (p === "auto") return "auto";
  return "gemini";
}

/**
 * Call MR Multi Model AI Coder router.
 * Sends an OpenAI-compatible chat completion request to the MR endpoint.
 */
async function callMRRouter(opts: AIRequestOptions): Promise<AIResponse> {
  const endpoint = process.env.MR_ROUTER_ENDPOINT;
  const apiKey = process.env.MR_ROUTER_API_KEY;

  if (!endpoint || !apiKey) {
    throw new Error("MR_ROUTER_ENDPOINT and MR_ROUTER_API_KEY must be set to use mr-router provider");
  }

  const model = opts.model || "claude-sonnet-4-20250514";
  const messages: Array<{ role: string; content: string }> = [];

  if (opts.systemPrompt) {
    messages.push({ role: "system", content: opts.systemPrompt });
  }
  messages.push({ role: "user", content: opts.prompt });

  const body: Record<string, unknown> = {
    model,
    messages,
    max_tokens: opts.maxTokens || 4096,
  };
  if (opts.temperature !== undefined) {
    body.temperature = opts.temperature;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`MR Router returned ${res.status}: ${text}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
    model?: string;
  };

  const text = data.choices?.[0]?.message?.content ?? "";
  const tokensIn = data.usage?.prompt_tokens ?? 0;
  const tokensOut = data.usage?.completion_tokens ?? 0;

  return {
    text,
    provider: "mr-router",
    model: data.model || model,
    tokensIn,
    tokensOut,
  };
}

/**
 * Call Google Gemini directly via the existing getAI() pattern.
 * This is a thin wrapper; the actual Gemini client lives in server.ts.
 * Callers should prefer the unified `generateFromRouter()` function.
 */
export async function callGeminiDirect(opts: AIRequestOptions): Promise<AIResponse> {
  // Dynamic import to avoid hard dependency when only using mr-router
  const { GoogleGenAI } = await import("@google/genai");

  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === "") {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const ai = new GoogleGenAI({
    apiKey: key,
    httpOptions: { headers: { "User-Agent": "clientum-ai-router" } },
  });

  const model = opts.model || "gemini-3.6-flash";
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  if (opts.systemPrompt) {
    contents.push({ role: "user", parts: [{ text: `System: ${opts.systemPrompt}` }] });
    contents.push({ role: "model", parts: [{ text: "Entendido." }] });
  }
  contents.push({ role: "user", parts: [{ text: opts.prompt }] });

  const response = await ai.models.generateContent({
    model,
    contents,
    config: opts.temperature !== undefined ? { temperature: opts.temperature } : undefined,
  });

  return {
    text: response.text ?? "",
    provider: "gemini",
    model,
    tokensIn: response.usageMetadata?.promptTokenCount ?? 0,
    tokensOut: response.usageMetadata?.candidatesTokenCount ?? 0,
  };
}

/**
 * Unified AI generation entry point.
 * Routes to the configured provider with automatic fallback.
 */
export async function generateFromRouter(opts: AIRequestOptions): Promise<AIResponse> {
  const provider = getProvider();

  if (provider === "mr-router") {
    return callMRRouter(opts);
  }

  if (provider === "auto") {
    try {
      return await callMRRouter(opts);
    } catch (err) {
      console.warn("[AI Router] MR Router failed, falling back to Gemini:", (err as Error).message);
      return callGeminiDirect(opts);
    }
  }

  // Default: gemini
  return callGeminiDirect(opts);
}

/**
 * List available models per provider (for UI display / settings).
 */
export function getAvailableModels(): Record<string, string[]> {
  return {
    "mr-router": [
      "claude-sonnet-4-20250514",
      "claude-3.5-sonnet",
      "qwen-max",
      "qwen-plus",
      "qoder-model",
    ],
    gemini: [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
    ],
  };
}
