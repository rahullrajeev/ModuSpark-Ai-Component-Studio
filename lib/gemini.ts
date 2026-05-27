import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey() {
  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) {
    throw new Error("Missing GOOGLE_AI_API_KEY environment variable.");
  }
  return key;
}

export function getGeminiClient() {
  return new GoogleGenerativeAI(getApiKey());
}

