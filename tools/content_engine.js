/**
 * Apex Guard - Content Engine (Powered by Gemini 1.5 Pro)
 * Usage: node tools/content_engine.js "Keyword" "Target City"
 * 
 * Capability:
 * 1. Generates 1,500+ word SEO Articles.
 * 2. Includes JSON-LD Schema.
 * 3. (Mock) Triggers Imagen 3 for assets.
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

async function generateBlog(keyword, city) {
    console.log(`🚀 Content Engine Starting: Generating blog for "${keyword}" in ${city}...`);

    const prompt = `
        You are an elite SEO Copywriter for "Apex Guard" (Pest Control).
        Write a 1,500-word ranking article about "${keyword}" for homeowners in ${city}.
        
        Requirements:
        1. **Tone**: Professional, authoritative, helpful.
        2. **Structure**: H1, H2s, H3s, Bullet points.
        3. **Keywords**: Integrate "Pest control ${city}", "${keyword} removal", "Safe exterminator".
        4. **Schema**: Include a <script type="application/ld+json"> block with TWO schema objects:
           - "FAQPage": Questions and answers from the article.
           - "PestControlService": Local business info for Apex Guard in ${city}.
        5. **Format**: Markdown.

        Output only the markdown content.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Save to file
        const slug = keyword.toLowerCase().replace(/ /g, '-');
        const filename = `content/blog/${slug}.md`;

        // Ensure dir exists
        const dir = path.dirname(filename);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(filename, text);
        console.log(`✅ Blog generated: ${filename}`);

        // Mock Imagen 3 Call (Requires Vertex AI Service Account)
        console.log(`🎨 [Mock] Generating Hero Image via Imagen 3: "Professional photo of ${keyword} in a modern kitchen, photorealistic, 4k"`);
        console.log(`   -> Saved to public/images/${slug}-hero.webp`);

    } catch (error) {
        console.error("Content Generation Error:", error);
    }
}

const keyword = process.argv[2];
const city = process.argv[3] || "Wilmington, NC";

if (!keyword) {
    console.log('Usage: node tools/content_engine.js "Termite Prevention" "Raleigh"');
} else {
    generateBlog(keyword, city);
}
