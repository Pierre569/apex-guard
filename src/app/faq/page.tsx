"use client";

import OneShot from "@/components/OneShot";
import Link from "next/link";
import { HelpCircle, Phone } from "lucide-react";

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <OneShot>
                        <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">Common Questions</span>
                        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6">Transparency First.</h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400">
                            You have questions. We have honest answers.
                        </p>
                    </OneShot>
                </div>

                <div className="space-y-6">
                    {[
                        { q: "Are you licensed and insured?", a: "Yes. ApexGuard is fully licensed and insured to provide professional pest control services in North Carolina." },
                        { q: "Do you offer year-round protection?", a: "Yes. Our focus is proactive prevention. While we offer one-time services, our strongest results come from structured, year-round protection plans designed to prevent repeat issues." },
                        { q: "Do you service Raleigh, Durham, Apex, and Cary?", a: "Yes—ApexGuard proudly serves Raleigh, Durham, Apex, Cary, and surrounding areas." },
                        { q: "Is your service safe for families and pets?", a: "We provide professional treatments designed for real homes. We use responsibly selected products and always explain what to expect before and after service to ensure comfort and safety." },
                        { q: "Do I have to sign a long-term contract?", a: "No! We hate traps. You can cancel your monthly membership anytime. If you cancel before 12 months, we just charge the difference for the initial service discount." },
                        { q: "What if the bugs come back?", a: "We stand behind our work. If pests return between scheduled visits, we will return to re-treat the affected area at no additional cost (Terms apply)." },
                    ].map((item, i) => (
                        <OneShot key={i} delay={i * 0.1}>
                            <details className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-white/10 group">
                                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center text-apex-navy dark:text-white">
                                    {item.q}
                                    <span className="transform group-open:rotate-180 transition text-apex-gold font-black text-xl">▼</span>
                                </summary>
                                <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed pl-4 border-l-2 border-apex-gold/20">
                                    {item.a}
                                </p>
                            </details>
                        </OneShot>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-apex-navy dark:bg-white/5 rounded-3xl text-white text-center relative overflow-hidden border border-transparent dark:border-white/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-apex-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-neutral-300 mb-8">
                            We don't use call centers. You'll speak with a local pro.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/contact" className="bg-apex-gold text-apex-navy font-bold py-3 px-8 rounded-lg hover:bg-white transition">
                                Contact Us
                            </Link>
                            <a href="tel:9195550123" className="flex items-center gap-2 text-white border-2 border-white/20 hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition">
                                <Phone size={20} /> Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
