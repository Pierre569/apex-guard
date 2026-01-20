/**
 * Apex Guard - Social Proof Generator (Powered by Gemini 1.5 Pro)
 * Usage: node tools/seo_reviews.js
 * 
 * Logic:
 * 1. Fetches Reviews (Mock or Google My Business API).
 * 2. Uses Gemini to analyze sentiment and write a "Trust Summary".
 * 3. Selects top 3 reviews for the homepage.
 * 4. Saves to src/data/reviews.json for the frontend to render.
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error("❌ Error: GOOGLE_API_KEY not found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Mock Reviews (In production, replace with Google Business Profile API fetch)
const RAW_REVIEWS = [
    { author: "Sarah M.", rating: 5, text: "Apex Guard saved my kitchen! Termites were everywhere, but Ryan fixed it in one day." },
    { author: "Mike T.", rating: 5, text: "Best pest control in Wilmington. Punctual, polite, and effective." },
    { author: "Jenny L.", rating: 4, text: "Great service, technician was a bit late but called ahead." },
    { author: "David B.", rating: 5, text: "I've used them for 3 years for mosquito control. Simply the best." },
    { author: "Amanda C.", rating: 5, text: "Professional, clean, and affordable. Highly recommend." }
];

async function generateSocialProof() {
    console.log("⭐ Analyzing Reviews with Gemini...");

    const prompt = `
        You are a Reputation Manager.
        Analyze these customer reviews for "Apex Guard" (Pest Control).
        
        1. Write a 2-sentence "Trust Summary" highlighting the most common praise keywords (e.g., Punctuality, Speed).
        2. Select the top 3 most persuasive reviews.
        3. Extract the key "Sentiment Tags" (e.g., "Fast", "Professional").

        Reviews:
        ${JSON.stringify(RAW_REVIEWS)}

        Return JSON:
        {
            "summary": "...",
            "featured_reviews": [ ... ],
            "tags": [ ... ]
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(jsonStr);

        const outputPath = path.resolve(__dirname, '../src/data/reviews.json');

        // Ensure dir exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`✅ Social Proof generated: ${outputPath}`);
        console.log(`   Summary: "${data.summary}"`);

    } catch (error) {
        console.error("Review Analysis Error:", error);
    }
}

generateSocialProof();
