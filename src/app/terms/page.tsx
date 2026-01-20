"use client";

import Link from "next/link";
import { ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
            {/* HEADER (Simple) */}


            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-navy/10 dark:bg-white/10 text-apex-navy dark:text-apex-gold text-xs font-bold uppercase tracking-widest mb-4">
                        <ShieldAlert size={14} />
                        Legal Protections
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-apex-navy dark:text-white mb-4">
                        Service Agreement & Terms
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400">
                        Clear expectations for a secure perimeter. Last updated: January 2026.
                    </p>
                </div>

                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <p>
                        By engaging ApexGuard for pest control services, you agree to the following terms. These policies ensure we can protect your home effectively and safely.
                    </p>

                    <hr className="border-neutral-200 dark:border-white/10 my-8" />

                    <h3>1. Scope of Service: Control vs. Eradication</h3>
                    <p>
                        ApexGuard employs military-grade strategies to <strong>control</strong> and <strong>prevent</strong> pest populations. While we strive for a pest-free environment, total eradication of every single insect is biologically impossible in an open ecosystem.
                    </p>
                    <ul>
                        <li><strong>The "Purge" Phase:</strong> Initial treatments may flush out pests, causing a temporary increase in visibility. This is normal.</li>
                        <li><strong>Maintenance:</strong> Regular service maintains the defensive perimeter. Skipping treatments voids service guarantees.</li>
                    </ul>

                    <h3>2. Access & Safety Requirements</h3>
                    <p>
                        To deploy our treatments safely, the homeowner acts as the "Base Commander" and must ensure:
                    </p>
                    <ul>
                        <li><strong>Gate Access:</strong> Perimeter gates must be unlocked on service days.</li>
                        <li><strong>Pet Safety:</strong> Pets must be secured inside. We will not enter a yard with unsecured animals.</li>
                        <li><strong>Minors:</strong> Children must be kept away from treated areas until dry (typically 30-60 minutes).</li>
                    </ul>

                    <h3>3. Liability Limitations (The "Shield" Clause)</h3>
                    <div className="bg-neutral-100 dark:bg-white/5 p-6 rounded-xl border-l-4 border-apex-gold my-6 not-prose">
                        <p className="font-bold text-apex-navy dark:text-white mb-2 flex items-center gap-2">
                            <ShieldAlert className="text-apex-gold" size={20} />
                            Liability Cap
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            ApexGuard's liability for any claim arising out of our services is strictly limited to the total amount paid by the customer for the specific service in question during the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages, including but not limited to lost income or property damage caused by pre-existing infestations (e.g., termite damage).
                        </p>
                    </div>

                    <h3>4. Re-Service Policy ("Free Callbacks")</h3>
                    <p>
                        We stand behind our wall of defense. If pest activity persists <strong>after 14 days</strong> from the initial treatment (allowing time for the product to work) and <strong>before 30 days</strong>, we will return to re-treat the affected area at no additional cost.
                    </p>
                    <p>
                        <em>Note: Callbacks requested within the first 10 days of service may be subject to a trip fee, as products need time to take effect.</em>
                    </p>

                    <h3>5. Payment & Cancellation</h3>
                    <p>
                        Services are billed upon completion. Subscription plans ("Fortress Shield") authorize recurring billing. Cancellations require 30 days' written notice to prevent gaps in your perimeter protection.
                    </p>
                </div>

                <div className="mt-16 p-8 bg-apex-navy dark:bg-white/5 rounded-2xl text-white text-center border border-transparent dark:border-white/10">
                    <FileText className="w-12 h-12 text-apex-gold mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Questions about our policies?</h2>
                    <p className="text-neutral-400 mb-6">We believe in total transparency.</p>
                    <a href="mailto:legal@apexguard.com" className="inline-block bg-white text-apex-navy font-bold py-3 px-8 rounded-lg hover:bg-apex-gold transition">
                        Contact Legal Team
                    </a>
                </div>
            </main>
        </div>
    );
}
