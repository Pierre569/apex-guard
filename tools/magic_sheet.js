/**
 * Apex Guard - Magic Sheet Automation
 * Usage: node tools/magic_sheet.js
 * 
 * Logic:
 * 1. Reads a "Content Plan" (Mock CSV/JSON).
 * 2. Identifies topics marked "Approved" but not "Published".
 * 3. Triggers content_engine.js for each.
 */

const { execSync } = require('child_process');

// Mock Data Source (In production, use src/lib/sheets.ts to fetch real CSV)
const CONTENT_PLAN = [
    { topic: "Termite Warning Signs", city: "Wilmington", status: "Approved" },
    { topic: "Mosquito Season prep", city: "Raleigh", status: "Draft" },
    { topic: "Bed Bug Heat Treatment", city: "Wilmington", status: "Approved" }
];

async function runMagicSheet() {
    console.log("✨ Magic Sheet Running...");

    const jobs = CONTENT_PLAN.filter(row => row.status === "Approved");
    console.log(`Found ${jobs.length} approved topics to generate.`);

    for (const job of jobs) {
        console.log(`\n-----------------------------------`);
        console.log(`📝 Processing: ${job.topic} (${job.city})`);

        try {
            // Call the Content Engine
            // Note: In a real app, you'd import the function, but running as CLI script for separation
            const cmd = `node tools/content_engine.js "${job.topic}" "${job.city}"`;
            execSync(cmd, { stdio: 'inherit' });

        } catch (error) {
            console.error(`❌ Failed to generate ${job.topic}`);
        }
    }

    console.log(`\n-----------------------------------`);
    console.log("✨ All jobs completed.");
}

runMagicSheet();
