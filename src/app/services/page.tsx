"use client";

import Link from "next/link";
import Image from "next/image";
import OneShot from "@/components/OneShot";
import { CheckCircle2, Building2, Home } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white transition-colors duration-300">
            {/* 1. HERO */}
            <section className="pt-40 pb-20 px-6 bg-apex-navy text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <OneShot>
                        <div className="relative w-48 h-48 mx-auto mb-8 opacity-100">
                            <Image
                                src="/logo.png"
                                alt="ApexGuard Shield"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">ELITE PEST DEFENSE.</h1>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            ApexGuard provides year-round defense plans designed to stop pest activity and reduce return visits through proactive prevention.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest text-apex-gold">
                            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Licensed & Insured</span>
                            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Precision + Prevention</span>
                        </div>
                    </OneShot>
                </div>
            </section>

            {/* 2. RESIDENTIAL */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <OneShot>
                        <div className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-white/10">
                            <div className="w-16 h-16 bg-apex-navy dark:bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                                <Home size={32} />
                            </div>
                            <h2 className="text-3xl font-black mb-4 dark:text-white">Residential Protection</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-6">
                                Protect your home with a structured plan that targets pest entry points and activity zones—built for consistency and long-term control.
                            </p>

                            <div className="space-y-4 mb-8">
                                <p className="font-bold text-sm uppercase tracking-wider text-neutral-400">Common Targets:</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Ants", "Roaches", "Spiders", "Seasonal Invaders", "General Pests"].map(p => (
                                        <span key={p} className="px-3 py-1 bg-apex-navy/5 dark:bg-white/10 text-apex-navy dark:text-white rounded-md font-medium text-sm">{p}</span>
                                    ))}
                                </div>
                            </div>

                            <Link href="/contact" className="block w-full text-center bg-apex-gold hover:bg-apex-gold-hover text-apex-navy font-bold py-4 rounded-xl transition shadow-lg shadow-apex-gold/20">
                                Get a Residential Quote
                            </Link>
                        </div>
                    </OneShot>
                    <div className="prose prose-lg text-neutral-600 dark:text-neutral-400">
                        <h3 className="text-2xl font-bold text-apex-navy dark:text-white">Why Homeowners Choose Us</h3>
                        <p>We don't just spray baseboards. We create a defensive perimeter around your home's foundation, eaves, and entry points.</p>
                        <ul className="space-y-2 list-none pl-0">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-apex-gold" size={18} /> <strong>Eave Sweeping:</strong> Removing spider webs and wasp nests up to 20ft.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-apex-gold" size={18} /> <strong>Granulation:</strong> Treating the soil to stop ants before they reach the structure.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-apex-gold" size={18} /> <strong>Crack & Crevice:</strong> Injecting products where pests hide.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. COMMERCIAL */}
            <section className="py-20 px-6 bg-white dark:bg-apex-navy/50 border-y border-neutral-100 dark:border-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 prose prose-lg text-neutral-600 dark:text-neutral-400">
                        <h3 className="text-2xl font-bold text-apex-navy dark:text-white">Operational Stability</h3>
                        <p>Pest activity in a commercial building isn’t just an annoyance—it’s a risk to your reputation and revenue.</p>
                        <p>ApexGuard provides professional pest defense built to support cleanliness standards, customer experience, and employee comfort.</p>
                        <div className="mt-8 p-6 bg-apex-navy dark:bg-white/5 rounded-xl text-white">
                            <p className="font-bold mb-2 text-apex-gold">Perfect For:</p>
                            <ul className="grid grid-cols-2 gap-2 text-sm">
                                <li>• Offices</li>
                                <li>• Retail Stores</li>
                                <li>• Professional Facilities</li>
                                <li>• Warehouses</li>
                            </ul>
                        </div>
                    </div>
                    <OneShot className="order-1 md:order-2">
                        <div className="bg-neutral-50 dark:bg-white/5 p-8 rounded-3xl shadow-lg border border-neutral-200 dark:border-white/10">
                            <div className="w-16 h-16 bg-apex-gold rounded-2xl flex items-center justify-center text-apex-navy mb-6">
                                <Building2 size={32} />
                            </div>
                            <h2 className="text-3xl font-black mb-4 dark:text-white">Commercial Defense</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                                Customized Integrated Pest Management (IPM) plans that comply with audit standards and keep your doors open.
                            </p>
                            <Link href="/contact" className="block w-full text-center bg-apex-navy hover:bg-neutral-800 dark:bg-white dark:text-apex-navy dark:hover:bg-neutral-200 text-white font-bold py-4 rounded-xl transition shadow-xl">
                                Get a Commercial Quote
                            </Link>
                        </div>
                    </OneShot>
                </div>
            </section>

            {/* 4. YEAR ROUND */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">Our Specialty</span>
                    <h2 className="text-4xl font-black text-apex-navy mt-2 mb-6">Year-Round Prevention Plans</h2>
                    <p className="text-xl text-neutral-600 mb-10">
                        Instead of reacting when pest pressure spikes, we run consistent service to reduce repeat problems and reinforce your property season after season.
                    </p>
                    <Link href="/pricing" className="inline-block bg-apex-gold text-apex-navy font-bold py-4 px-12 rounded-lg shadow-xl hover:bg-white hover:scale-105 transition-all">
                        Start Year-Round Coverage
                    </Link>
                </div>
            </section>

        </div>
    );
}
