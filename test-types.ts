
import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI({ apiKey: "test" });
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(genAI)));
