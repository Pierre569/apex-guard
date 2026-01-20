import { SiteManifest } from '@/config/site-manifest';

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto p-8 py-16 prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Agreement to Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and {SiteManifest.businessName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), concerning your access to and use of the {SiteManifest.url} website.</p>

            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) are owned or controlled by us.</p>

            <h2>3. User Representations</h2>
            <p>By using the Site, you represent and warrant that (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information.</p>

            <h2>4. AI Assistant Usage</h2>
            <p>Our website utilizes an Artificial Intelligence assistant (&quot;Alex&quot;). Information provided by Alex is for informational purposes only. Official quotes and diagnosis must be confirmed by a licensed technician.</p>

            <h2>5. Contact Us</h2>
            <p>To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
            <p>
                <strong>{SiteManifest.businessName}</strong><br />
                {SiteManifest.location}<br />
                {SiteManifest.phone}
            </p>
        </div>
    );
}
