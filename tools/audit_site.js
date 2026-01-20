/**
 * Apex Guard - Performance & SEO Auditor (Powered by Gemini)
 * Usage: node tools/audit_site.js <relative_path_to_file>
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

async function auditFile(filePath) {
    try {
        const fullPath = path.resolve(__dirname, '..', filePath);
        if (!fs.existsSync(fullPath)) {
            console.error(`❌ File not found: ${fullPath}`);
            return;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        const fileExt = path.extname(fullPath);

        console.log(`🔍 Auditing ${filePath} with Gemini 1.5 Pro...`);

        const prompt = `
            You are a Senior Web Performance Engineer.
            Analyze this ${fileExt} file for performance bottlenecks, SEO issues, and code smell.
            
            Focus on:
            1. Core Web Vitals (LCP, CLS, FID).
            2. Redundant code or unused CSS/JS.
            3. Accessibility (if HTML/JSX).
            4. Image optimization opportunities.

            Return a structured response:
            - **Score**: 1-100
            - **Critical Issues**: List of high priority fixes.
            - **Optimized Snippet**: Rewrite the worst part of the code to be better.

            File Content:
            ${content.substring(0, 30000)} // Truncated to fit context if massive
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("\n" + response.text());

    } catch (error) {
        console.error("Audit Error:", error);
    }
}

const targetFile = process.argv[2];
if (!targetFile) {
    console.log("Usage: node tools/audit_site.js <file_path>");
    console.log("Example: node tools/audit_site.js src/app/page.tsx");
} else {
    auditFile(targetFile);
}
