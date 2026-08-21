import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const city = "Cordoba";
  const industry = "Ferreteria";
  const prompt = `Sos un motor de inteligencia comercial B2B y prospección de mapas en tiempo real para la plataforma Clientum.
Buscá con Google Search en tiempo real y devolvé una lista de 5 a 8 empresas/comercios/industrias REALES que operen en o cerca de la ciudad o zona "${city}" pertenecientes al rubro "${industry}".

Devolvé ÚNICAMENTE un array JSON estricto con la siguiente estructura por objeto (sin explicaciones ni texto adicional):
[
  {
    "name": "Nombre exacto y real de la empresa",
    "category": "${industry}",
    "city": "${city}",
    "country": "Argentina",
    "address": "Dirección real o avenida importante en ${city}",
    "lat": -34.6037,
    "lng": -58.3816,
    "rating": 4.6,
    "review_count": 25,
    "phone": "+54 11 4000-0000",
    "website": "https://empresa.com",
    "estimatedEmployees": "20-100 empleados",
    "estimatedRevenueUsd": 2000000
  }
]

ES OBLIGATORIO extraer y rellenar el TELÉFONO REAL ("phone") y SITIO WEB REAL ("website") de Google. Si la empresa no tiene web, pon "". Asegúrate de colocar coordenadas de latitud ("lat") y longitud ("lng") reales en el rango geográfico aproximado de la ciudad "${city}".`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    console.log("Raw Response:");
    console.log(response.text);
    
    const raw = response.text || "[]";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    console.log("Parsed correctly!");
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
