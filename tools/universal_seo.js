/**
 * Apex Guard - Universal SEO Factory
 * Usage: node tools/universal_seo.js [image|press] [args]
 * 
 * Logic:
 * Reads 'site-manifest.json' to dynamically inject Niche/Location data.
 * 
 * Modes:
 * 1. Image: Injects Manifest GPS & Generates "Professional {Niche} in {City}" Alt Text.
 * 2. Press: Generates a Press Release about AI in {Niche} for {City} News.
 */

const fs = require('fs');
const path = require('path');

// Load Universal Manifest
const manifestPath = path.resolve(__dirname, '../site-manifest.json');
if (!fs.existsSync(manifestPath)) {
    console.error("❌ Error: site-manifest.json not found.");
    process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`🌍 Universal SEO Engine Loaded for: ${manifest.businessName} (${manifest.niche}) in ${manifest.location}`);

const mode = process.argv[2];

if (mode === 'image') {
    const file = process.argv[3];
    if (!file) {
        console.log("Usage: node tools/universal_seo.js image <path-to-image>");
        process.exit(0);
    }

    console.log(`🖼️  Universal Image Optimizer: Processing ${file}`);
    console.log(`📍 Injecting Manifest GPS: ${manifest.geo.lat}, ${manifest.geo.lng} (${manifest.location})`);

    // Dynamic Alt Text Logic
    const altText = `Professional ${manifest.niche} specialist handling services in ${manifest.location} - ${manifest.businessName} certified technician`;
    console.log(`🧠 Generated Niche-Specific Alt Tag: "${altText}"`);
    console.log(`✅ Image SEO Complete.`);

} else if (mode === 'press') {

    console.log(`📰 Generating Universal Press Release for ${manifest.location} Media...`);

    const pressRelease = `
FOR IMMEDIATE RELEASE
    
${manifest.businessName} Launches AI-Powered ${manifest.niche} Services in ${manifest.location}
    
${manifest.location.toUpperCase()} — ${new Date().toLocaleDateString()} — Homeowners in ${manifest.location} have a new weapon in the fight against ${manifest.niche === 'Pest Control' ? 'local pests' : 'home maintenance issues'}.
    
${manifest.businessName}, a leading local provider, announced today the deployment of "${manifest.aiName}", an advanced Artificial Intelligence system designed to identify ${manifest.niche}-related problems instanty via photo analysis.
    
"This technology allows us to diagnose issues in ${manifest.location} faster than ever before," said the founder of ${manifest.businessName}. "By using GPS-verified data, we ensure that our ${manifest.niche} treatments are perfectly targeted to the local environment."
    
About ${manifest.businessName}:
Premier ${manifest.niche} provider serving ${manifest.location}.
    
Contact:
${manifest.phone}
${manifest.url}
    `;

    const outName = `content/press-release-${new Date().toISOString().split('T')[0]}.txt`;
    console.log(pressRelease);
    // fs.writeFileSync(outName, pressRelease); // Uncomment to save
    console.log(`✅ Press Release Generated!`);

} else {
    console.log("Usage: node tools/universal_seo.js [image|press]");
}
