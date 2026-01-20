import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.warn("⚠️ GOOGLE_API_KEY is missing. Gemini features will not work.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Uses Gemini Vision to analyze an image URL and generate metadata.
 * Useful for Alt Text, Captioning, and Quality Scoring.
 */
export async function analyzeImage(imageUrl: string) {
    if (!apiKey) throw new Error("Google API Key not configured");

    try {
        // Fetch the image
        const imageResp = await fetch(imageUrl);
        const imageBuffer = await imageResp.arrayBuffer();

        const prompt = `
      Analyze this website asset. Return a JSON object with:
      1. "altText": A concise, accessible description for screen readers (max 15 words).
      2. "caption": A marketing-friendly caption.
      3. "qualityScore": A number 1-10 based on sharpness and composition.
      4. "tags": An array of 5 SEO-friendly keywords.
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: Buffer.from(imageBuffer).toString("base64"),
                    mimeType: imageResp.headers.get("content-type") || "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean code fences if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return null;
    }
}

/**
 * Uses Gemini to audit a snippet of code or text.
 */
export async function auditContent(content: string, type: "css" | "js" | "copy") {
    if (!apiKey) throw new Error("Google API Key not configured");

    const prompt = `
        You are a high-end web performance and SEO expert.
        Analyze the following ${type} snippet.
        Return a JSON object with:
        1. "score": 1-100
        2. "suggestions": Array of specific improvements.
        3. "optimizedContent": The rewritten, optimized version of the snippet.

        Snippet:
        ${content}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText);
}

/**
 * Bug Identifier Logic (Phase 13)
 * Uses Gemini Vision to identify pests and determine "Danger Level".
 */
export async function identifyPest(base64Image: string) {
    if (!apiKey) throw new Error("Google API Key not configured");

    const prompt = `
      Analyze this image for a Pest Control Website.
      
      Tasks:
      1. Identify the insect/pest in the photo.
      2. Determine if it is a "Danger Pest" (Termite, Cockroach, Bed Bug, Rodent, Wasp, Ant).
      3. Provide a confidence score.

      Return JSON:
      {
        "pest": "German Cockroach",
        "isDangerous": true,
        "confidence": "98%"
      }

      If no bug is found, return "pest": "Unknown" and "isDangerous": false.
    `;

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Bug ID Error:", error);
        return { pest: "Error", isDangerous: false, confidence: "0%" };
    }
}
