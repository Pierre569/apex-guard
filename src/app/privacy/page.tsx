import { SiteManifest } from '@/config/site-manifest';

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto p-8 py-16 prose dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>{SiteManifest.businessName} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you visit our website {SiteManifest.url}.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul>
                <li>**Personal Data**: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                <li>**Derivative Data**: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h2>3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
                <li>Schedule pest control inspections and treatments.</li>
                <li>Send you a confirmation email or text message.</li>
                <li>Process payments and refunds.</li>
                <li>Respond to customer service requests (&quot;Alex&quot; AI Assistant).</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.</p>

            <h2>5. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <p>
                <strong>{SiteManifest.businessName}</strong><br />
                {SiteManifest.location}<br />
                {SiteManifest.phone}
            </p>
        </div>
    );
}
