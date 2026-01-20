const fs = require('fs');
const path = require('path');

// Manually read SiteManifest to avoid TS compilation issues in this simple script
// In a real TS setup, we'd use ts-node or compile first.
function getManifestNiche() {
    try {
        const manifestPath = path.join(__dirname, '../src/config/site-manifest.ts');
        const content = fs.readFileSync(manifestPath, 'utf8');
        const match = content.match(/niche:\s*["']([^"']+)["']/);
        return match ? match[1] : 'General';
    } catch (e) {
        console.warn("⚠️ Could not read SiteManifest, defaulting to broad check.");
        return 'General';
    }
}

async function validateAllPending() {
    const pendingDir = path.join(__dirname, '../content/pending');
    const approvedDir = path.join(__dirname, '../content/approved');
    const niche = getManifestNiche();

    console.log(`🔍 Content Validator Started. Target Niche: "${niche}"`);

    if (!fs.existsSync(pendingDir)) {
        console.log("ℹ️ No pending content directory found. Creating...");
        fs.mkdirSync(pendingDir, { recursive: true });
        return;
    }
    if (!fs.existsSync(approvedDir)) {
        fs.mkdirSync(approvedDir, { recursive: true });
    }

    const files = fs.readdirSync(pendingDir);

    if (files.length === 0) {
        console.log("✅ No pending files to validate.");
        return;
    }

    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(pendingDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const wordCount = content.split(/\s+/).length;

        console.log(`\n📄 Checking: ${file} (${wordCount} words)`);

        // Gate 1: Word Count
        if (wordCount < 1000) {
            console.error(`❌ REJECTED: ${file} is only ${wordCount} words. (Min: 1000)`);
            continue;
        }

        // Gate 2: Niche Relevance (The AI Double Check)
        // Here we simulate the AI check; in production, this calls Gemini API
        const isRelevant = content.toLowerCase().includes(niche.toLowerCase()) ||
            content.toLowerCase().includes('pest') ||
            content.toLowerCase().includes('insect');

        if (!isRelevant) {
            console.error(`❌ REJECTED: ${file} does not match niche '${niche}'.`);
            continue;
        }

        // If passed, move to 'Approved'
        fs.renameSync(filePath, path.join(approvedDir, file));
        console.log(`✅ APPROVED: ${file} is ready for scheduling.`);
    }
}

validateAllPending();
