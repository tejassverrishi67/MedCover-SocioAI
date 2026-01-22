import { GoogleGenAI, Type, Chat } from "@google/genai";
import { UserProfile, AIAnalysisResponse } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const createChatSession = (): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      // Social Impact Framing & Persona
      systemInstruction: "You are Tejas, a friendly, student-built AI assistant for MedCover. Your goal is to help people understand healthcare options in India. Prioritize explaining government welfare options (Ayushman Bharat, CGHS, ESIC) for those who might need them, and private options for others. Use simple, everyday language. Avoid corporate jargon like 'synergize', 'leverage', or 'probabilistic'. Instead, say 'use', 'help', or 'based on'. Be encouraging and warm. Important: You are NOT a doctor. Do not provide medical diagnoses. If a user asks about symptoms, kindly suggest they see a professional. Keep answers concise and chatty.",
    },
  });
};

export const analyzeProfile = async (profile: UserProfile): Promise<AIAnalysisResponse> => {
  const ai = getClient();
  
  const prompt = `
    Analyze the following user for medical insurance and health scheme suitability within the INDIAN healthcare ecosystem.
    
    User Signals:
    - Age: ${profile.age}
    - Annual Income: ${profile.currency} ${profile.income}
    - Location: ${profile.location}
    - Existing Conditions: ${profile.conditions || "None stated"}
    - Medical History: ${profile.medicalHistory || "None stated"}
    - Family Dependents: ${profile.dependents}
    - Preference: ${profile.preference}

    CORE INSTRUCTIONS:
    1. Reason based on the Indian market. Weigh income (in INR) against medical needs and local healthcare costs.
    2. Create a "User Profile Summary" that simply explains their situation (e.g., "You seem to have a stable income but some health risks to watch out for").
    3. Evaluate suitability for Indian Government Schemes (e.g., PMJAY/Ayushman Bharat if eligible, ESIC), Private Insurance, and Top-up plans.
    4. Provide 3-4 specific recommendations relevant to India.
    5. Explain "Trade-offs" (what is good vs what is missing).
    6. **Reasoning Summary**: Provide a simple explanation of how you looked at their money, health, and location (e.g. "We saw your income is high, so you might not qualify for government aid, but you can afford better private care").
    7. Use natural, student-friendly language. Avoid words like "probabilistic", "trajectory", "contextual similarity", "vulnerability". Use phrases like "based on your info", "seems like", "might be good".
    8. **Social Impact**: Focus on helping them get the best care they can afford.

    Format the response strictly as JSON matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            userProfileSummary: {
              type: Type.STRING,
              description: "A simple interpretation of the user's situation.",
            },
            suitabilityNarrative: {
              type: Type.STRING,
              description: "A friendly explanation of what kind of coverage makes sense for them.",
            },
            aiReasoningSummary: {
              type: Type.STRING,
              description: "A simple summary of how you weighed their financial and health details.",
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: "Name of the scheme or insurance type." },
                  type: { type: Type.STRING, enum: ["Government", "Private", "Hybrid"] },
                  suitabilityScore: { type: Type.NUMBER, description: "0-100 score." },
                  confidenceLevel: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  reasoning: { type: Type.STRING, description: "Why this was suggested - use simple language." },
                  tradeOffs: { type: Type.STRING, description: "Pros and cons." },
                },
                required: ["id", "name", "type", "suitabilityScore", "confidenceLevel", "reasoning", "tradeOffs"],
              },
            },
            riskAnalysis: {
              type: Type.STRING,
              description: "Specific things they should be careful about regarding money or health.",
            },
            limitations: {
              type: Type.STRING,
              description: "Things you don't know for sure or assumptions you made.",
            },
            finalAdvice: {
              type: Type.STRING,
              description: "Friendly closing advice.",
            },
          },
          required: ["userProfileSummary", "suitabilityNarrative", "aiReasoningSummary", "recommendations", "riskAnalysis", "limitations", "finalAdvice"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResponse;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};