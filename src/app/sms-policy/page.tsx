import { siteConfig } from "@/config/site";

export default function SMSPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-6">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    SMS Privacy Policy
                </h1>

                <div className="prose dark:prose-invert">
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        <strong>Last Updated: January 19, 2026</strong>
                    </p>

                    <h2 className="text-2xl font-bold mt-8">1. Information Collection</h2>
                    <p>
                        We collect your phone number only when you voluntarily provide it to us via our contact forms, quote requests, or by calling us directly.
                    </p>

                    <h2 className="text-2xl font-bold mt-8">2. Use of Information</h2>
                    <p>
                        We use your phone number to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide requested quotes and service estimates.</li>
                        <li>Confirm appointments and provide service notifications.</li>
                        <li>Communicate with you regarding your pest control inquiry via our AI assistant or support staff.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8">3. Information Sharing (Strict No-Share Policy)</h2>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                        <p className="font-semibold text-blue-900 dark:text-blue-100">
                            No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8">4. Opt-Out</h2>
                    <p>
                        You can opt-out of receiving SMS messages from us at any time by replying <strong>STOP</strong> to any message.
                    </p>

                    <h2 className="text-2xl font-bold mt-8">5. Contact Us</h2>
                    <p>
                        If you have questions about this policy, please contact us at: <br />
                        <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:underline">{siteConfig.email}</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
