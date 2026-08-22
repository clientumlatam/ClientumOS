import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of Gemini client for security and robustness
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required in secrets");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Helper to check if API key is present
function isApiKeyPresent(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

// 1. CRM Copilot Endpoint
app.post("/api/ai/copilot", async (req, res) => {
  try {
    if (!isApiKeyPresent()) {
      res.status(500).json({ error: "API key is not configured in Secrets." });
      return;
    }
    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const client = getGeminiClient();
    
    let systemInstruction = "You are Twenty AI Copilot, a premium, real-time sales intelligence advisor and strategic CRM assistant. " +
      "Your goal is to help accelerate the sales pipeline, draft executive follow-ups, suggest objection handling plays, " +
      "and extract CRM action items. Keep answers highly professional, elegant, actionable, and formatted nicely in markdown. Do not mention technical implementation details.";
    
    if (context) {
      systemInstruction += `\n\nActive Record Context:\n${JSON.stringify(context, null, 2)}`;
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.7-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Copilot Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
  }
});

// 2. CMO Assistant Endpoint
app.post("/api/ai/cmo", async (req, res) => {
  try {
    if (!isApiKeyPresent()) {
      res.status(500).json({ error: "API key is not configured in Secrets." });
      return;
    }
    const { query } = req.body;
    if (!query) {
      res.status(400).json({ error: "query is required" });
      return;
    }

    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Provide a high-quality strategic marketing and retention strategy for: "${query}"`,
      config: {
        systemInstruction: "You are a professional Chief Marketing Officer (CMO). Provide actionable positioning, email marketing sequences, and content ideas. Use clear markdown headers.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("CMO Strategy Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
  }
});

// 3. GTM Strategy Generator Endpoint
app.post("/api/ai/gtm", async (req, res) => {
  try {
    if (!isApiKeyPresent()) {
      res.status(500).json({ error: "API key is not configured in Secrets." });
      return;
    }
    const { product, audience } = req.body;
    if (!product || !audience) {
      res.status(400).json({ error: "product and audience are required" });
      return;
    }

    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Generate a detailed Go-To-Market (GTM) strategy for the product "${product}" targeting "${audience}".`,
      config: {
        systemInstruction: "You are a premium SaaS Go-To-Market strategist. Outline the key target segments, suggested channels, a unique value proposition, and specific pricing suggestions. Use elegant markdown.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("GTM Strategy Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
  }
});

// 4. AI Ad Copy Studio Endpoint
app.post("/api/ai/adcopy", async (req, res) => {
  try {
    if (!isApiKeyPresent()) {
      res.status(500).json({ error: "API key is not configured in Secrets." });
      return;
    }
    const { product, platform } = req.body;
    if (!product || !platform) {
      res.status(400).json({ error: "product and platform are required" });
      return;
    }

    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Write 3 high-converting ad copy variations for "${product}" on "${platform}".`,
      config: {
        systemInstruction: "You are a senior conversion copywriter. Write three distinct ad copy variations with hooks, core body benefits, and strong Calls to Action (CTA). Return them formatted as an elegant JSON list of strings.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        },
        temperature: 0.8,
      }
    });

    try {
      const parsed = JSON.parse(response.text || "[]");
      res.json({ copies: parsed });
    } catch {
      res.json({ copies: [response.text] });
    }
  } catch (error: any) {
    console.error("Ad Copy Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
  }
});

// 5. Maps Prospecting Endpoint (Structured JSON mode)
app.post("/api/ai/prospect", async (req, res) => {
  try {
    if (!isApiKeyPresent()) {
      res.status(500).json({ error: "API key is not configured in Secrets." });
      return;
    }
    const { city, niche } = req.body;
    if (!city || !niche) {
      res.status(400).json({ error: "city and niche are required" });
      return;
    }

    const client = getGeminiClient();
    
    const response = await client.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Find 3 plausible and detailed lead businesses of type "${niche}" in or around the area "${city}".`,
      config: {
        systemInstruction: "You are a professional sales prospecting database engine. Generate realistic lead details including company name, phone, structured local address, realistic sales status ('Alta Intención' or 'Excelente Prospecto' or 'Calificación Media'), and realistic ratings.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the business or gym" },
              phone: { type: Type.STRING, description: "Formatted local telephone number" },
              address: { type: Type.STRING, description: "Realistic local street address" },
              status: { type: Type.STRING, description: "Prospect rating tier: 'Alta Intención', 'Excelente Prospecto', or 'Calificación Media'" },
              rating: { type: Type.STRING, description: "Formatted rating e.g. '4.7 ★' or '4.3 ★'" }
            },
            required: ["name", "phone", "address", "status", "rating"]
          }
        },
        temperature: 0.5,
      }
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ results: parsed });
  } catch (error: any) {
    console.error("Prospect Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
  }
});

// --- Vite Middleware Integration ---
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server", err);
});
