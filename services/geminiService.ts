
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

// Constants for persistent rate limiting
const QUOTA_BLOCK_KEY = '444_system_quota_blocked_until';
const BLOCK_DURATION = 10 * 60 * 1000; // Increased to 10 minutes for safety
const STORAGE_KEY = '444_image_cache_v3';

// Professional System Fallbacks
const FALLBACK_IMAGES: Record<string, string> = {
  "hero": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600",
  "ai": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  "time": "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800",
  "focus": "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=800",
  "asset": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
};

/**
 * Checks if we are in a blocked state. 
 * Publicly exported so UI components can check before calling.
 */
export const isQuotaBlocked = (): boolean => {
  const blockedUntil = localStorage.getItem(QUOTA_BLOCK_KEY);
  if (!blockedUntil) return false;
  const isBlocked = Date.now() < parseInt(blockedUntil);
  if (!isBlocked) {
    localStorage.removeItem(QUOTA_BLOCK_KEY);
    return false;
  }
  return true;
};

const setQuotaBlocked = () => {
  localStorage.setItem(QUOTA_BLOCK_KEY, (Date.now() + BLOCK_DURATION).toString());
};

const getPersistentCache = (): Map<string, string> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Map(JSON.parse(data)) : new Map();
  } catch { return new Map(); }
};

const setPersistentCache = (cache: Map<string, string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(cache.entries())));
  } catch (e) {}
};

/**
 * Centralized request wrapper that SILENTLY fails on quota issues.
 * Prevents any SDK code from running if already blocked.
 */
async function silentRequest<T>(fn: (ai: GoogleGenAI) => Promise<T>): Promise<T | null> {
  if (isQuotaBlocked() || !API_KEY) return null;
  
  try {
    // Only initialize SDK if we aren't blocked
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    return await fn(ai);
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toLowerCase();
    // Catch quota, 429, or "exceeded" keywords
    if (errorStr.includes("429") || errorStr.includes("quota") || errorStr.includes("exceeded") || error?.status === 429) {
      setQuotaBlocked();
      console.warn("444 System: Quota limit reached. Switching to local fallbacks.");
    }
    return null;
  }
}

export const generateProductivityImage = async (prompt: string, fallbackKey?: string): Promise<string | null> => {
  const cache = getPersistentCache();
  if (cache.has(prompt)) return cache.get(prompt)!;

  const result = await silentRequest(async (ai) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `High-end minimalist tech visual: ${prompt}. Cinematic lighting, blue/white/black.` }] },
      config: { imageConfig: { aspectRatio: "16:9" } },
    });
    return response.candidates?.[0]?.content?.parts.find(p => p.inlineData)?.inlineData?.data;
  });

  if (result) {
    const base64 = `data:image/png;base64,${result}`;
    cache.set(prompt, base64);
    setPersistentCache(cache);
    return base64;
  }
  
  return FALLBACK_IMAGES[fallbackKey || "asset"] || null;
};

export const generateBlogPosts = async (count: number): Promise<any[]> => {
  const result = await silentRequest(async (ai) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} tech blog posts about Productivity and AGI for '444'.`,
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
    return JSON.parse(response.text);
  });

  return result || Array.from({ length: count }).map((_, i) => ({
    title: "The 444 System Architecture",
    excerpt: "Exploring the logic behind high-output faceless systems.",
    content: "Full technical analysis of neural network productivity optimization...",
    author: "System Agent",
    date: new Date().toISOString(),
    tags: ["Productivity", "AGI"]
  }));
};

export const analyzeSchedule = async (schedule: string) => {
  const result = await silentRequest(async (ai) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze schedule: "${schedule}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            efficiencyScore: { type: Type.NUMBER },
            bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            optimizingThought: { type: Type.STRING }
          },
          required: ["efficiencyScore", "bottlenecks", "recommendations", "optimizingThought"]
        }
      }
    });
    return JSON.parse(response.text);
  });

  return result || {
    efficiencyScore: 72,
    bottlenecks: ["Manual task switching", "Neural latency in planning"],
    recommendations: ["Automate email protocols", "Sync AGI nodes"],
    optimizingThought: "System operating on local cached logic. Neural nodes at capacity."
  };
};

export const getAssistantChat = () => {
  // We do not initialize if blocked
  if (isQuotaBlocked() || !API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the '444 System Assistant'. Professional, concise, unsentimental.",
    },
  });
};
