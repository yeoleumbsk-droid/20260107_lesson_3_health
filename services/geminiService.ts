
import { GoogleGenAI, Type } from "@google/genai";
import { UserStats, CalculationResult, AIAnalysis } from "../types";

export const getAIHealthAnalysis = async (
  stats: UserStats,
  results: CalculationResult
): Promise<AIAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following health profile and provide professional, friendly advice.
    
    User Stats:
    - Age: ${stats.age}
    - Gender: ${stats.gender}
    - Height: ${stats.height}cm
    - Weight: ${stats.weight}kg
    - Activity Level: ${stats.activityLevel}
    
    Calculated Results:
    - BMR (Basal Metabolic Rate): ${results.bmr} kcal
    - TDEE (Total Daily Energy Expenditure): ${results.tdee} kcal
    - BMI: ${results.bmi.toFixed(1)} (${results.bmiCategory})
    
    Please provide:
    1. A brief health summary.
    2. Personalized dietary recommendations.
    3. Targeted exercise advice.
    4. General health tips for longevity.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          dietAdvice: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          exerciseAdvice: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          healthTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "dietAdvice", "exerciseAdvice", "healthTips"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as AIAnalysis;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not parse AI analysis.");
  }
};
