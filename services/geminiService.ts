
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

// Persistent cache key for productivity images
const STORAGE_KEY = '444_image_cache_v1';

// Fallback high-quality productivity images if API is exhausted
const FALLBACK_IMAGES: Record<string, string> = {
  "hero": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600",
  "ai": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  "time": "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800",
  "focus": "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=800"
};

const getPersistentCache = (): Map<string, string> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Map(JSON.parse(data)) : new Map();
  } catch {
    return new Map();
  }
};

const setPersistentCache = (cache: Map<string, string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(cache.entries())));
  } catch (e) {
    console.warn("Could not save image to localStorage (likely quota full)");
  }
};

/**
 * Utility for exponential backoff retries with jitter
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 2000
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = JSON.stringify(error);
    const isRateLimit = errorStr.includes("429") || error?.status === 429 || error?.code === 429;
    
    if (retries > 0 && isRateLimit) {
      // Add jitter to delay
      const jitter = Math.random() * 1000;
      const delay = baseDelay + jitter;
      console.warn(`444 System: API Rate limit encountered. Throttling request. Retrying in ${Math.round(delay)}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, baseDelay * 2.5);
    }
    throw error;
  }
}

export const generateProductivityImage = async (prompt: string, fallbackKey?: string): Promise<string | null> => {
  if (!API_KEY) return FALLBACK_IMAGES[fallbackKey || ""] || null;
  
  const cache = getPersistentCache();
  if (cache.has(prompt)) {
    return cache.get(prompt)!;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `Extremely professional, high-end minimalist productivity visual: ${prompt}. Cinematic lighting, blue and white color palette, 4k resolution, clean design.` },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        },
      });
    });
    
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData) {
      const base64 = `data:image/png;base64,${part.inlineData.data}`;
      cache.set(prompt, base64);
      setPersistentCache(cache);
      return base64;
    }
  } catch (error: any) {
    console.error("444 System: Image synthesis failed. Reverting to local fallback.", error?.message || error);
  }
  
  return FALLBACK_IMAGES[fallbackKey || ""] || null;
};

export const generateBlogPosts = async (count: number): Promise<any[]> => {
  if (!API_KEY) return [];
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate ${count} highly technical and professional blog posts about Productivity, AI Agents, AGI, and Deep Learning for a brand called '444'. Format as a JSON array of objects with title, excerpt, content, author, tags (array), and date strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                excerpt: { type: Type.STRING },
                content: { type: Type.STRING },
                author: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                date: { type: Type.STRING }
              },
              required: ["title", "excerpt", "content", "author", "tags", "date"]
            }
          }
        }
      });
    }, 2, 3000);
    return JSON.parse(response.text);
  } catch (error) {
    console.error("444 System: Blog generation failed:", error);
    return [];
  }
};
