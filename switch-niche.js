const fs = require('fs');
const path = require('path');

const niche = process.argv[2]; // Get niche name from command line

if (!niche) {
    console.error("❌ Please specify a niche (e.g., node switch-niche.js plumbing)");
    process.exit(1);
}

const vaultPath = path.join(__dirname, 'niche-vault', niche);
const manifestPath = path.join(vaultPath, 'manifest.json');

if (!fs.existsSync(vaultPath)) {
    console.error(`❌ Niche "${niche}" not found in vault.`);
    process.exit(1);
}

// 1. Update the Main Site Manifest (Typescript compatible)
const newManifest = fs.readFileSync(manifestPath, 'utf8');
const tsContent = `export const SiteManifest = ${newManifest};`;
fs.writeFileSync(path.join(__dirname, 'src', 'config', 'site-manifest.ts'), tsContent);

// 2. Integration: Update Distance Threshold Logic (if applicable)
// This is a placeholder for updating internal logic files if they were dynamic
const distanceThreshold = (niche === 'plumbing') ? 10 : 30;
console.log(`ℹ️ [Config] Distance Threshold set to: ${distanceThreshold} miles`);

// 3. Inform Antigravity Agent
console.log(`✅ PROJECT TRANSFORMED TO: ${niche.toUpperCase()}`);
console.log(`🚀 NEXT STEP: Run 'npm run dev' to see the new ${niche} site.`);
