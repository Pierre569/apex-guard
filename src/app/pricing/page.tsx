"use client";

import { CheckCircle2, Shield, Zap, X } from "lucide-react";
import Link from "next/link";
import OneShot from "@/components/OneShot";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pb-20 transition-colors duration-300">
            {/* HEADER */}


            <div className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black mb-6">DEFEND YOUR FORTRESS.</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Choose the level of protection your home requires. All plans include our <span className="font-bold text-apex-navy dark:text-apex-gold">100% Re-Service Guarantee</span>.
                    </p>
                </div>

                {/* PRICING GRID */}
                <div className="grid md:grid-cols-3 gap-8 items-start">

                    {/* OPTION 1: THE SKIRMISH (One-Time) */}
                    <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-xl border border-neutral-100 dark:border-white/10 relative group hover:border-apex-navy/20 dark:hover:border-apex-gold/50 transition-all">
                        <h3 className="text-2xl font-bold text-neutral-400 mb-2">The Skirmish</h3>
                        <div className="text-4xl font-black text-apex-navy dark:text-white mb-6">$149<span className="text-lg font-medium text-neutral-400">/one-time</span></div>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-8 h-12">For immediate relief from a specific breakout. No long-term defense.</p>

                        <button
                            id="ghl-btn-skirmish"
                            className="w-full py-4 rounded-lg font-bold border-2 border-apex-navy text-apex-navy hover:bg-apex-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-apex-navy transition mb-8"
                        >
                            Launch One-Time Strike
                        </button>

                        <ul className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Interior & Exterior Treatment</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Web & Nest Removal (1st Floor)</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Covers Ants, Spiders, Roaches</span></li>
                            <li className="flex gap-3 text-neutral-400"><X size={18} /> <span>No Free Re-Service Guarantee</span></li>
                            <li className="flex gap-3 text-neutral-400"><X size={18} /> <span>No Termite Monitoring</span></li>
                        </ul>
                    </div>

                    {/* OPTION 2: FORTRESS SHIELD (The Winner) */}
                    <div className="bg-apex-navy dark:bg-black/40 rounded-2xl p-8 shadow-2xl relative transform md:-translate-y-4 border border-apex-gold">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-apex-gold text-apex-navy font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider shadow-lg">
                            Most Popular Defense
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Shield className="text-apex-gold" fill="currentColor" /> Fortress Shield
                        </h3>
                        <div className="text-5xl font-black text-white mb-6">$39<span className="text-lg font-medium text-neutral-400">/mo</span></div>
                        <p className="text-neutral-300 mb-8 h-12">Complete, year-round perimeter protection. We stand guard so you don't have to.</p>

                        <button
                            id="ghl-btn-fortress"
                            className="w-full py-4 rounded-lg font-bold bg-apex-gold text-apex-navy hover:bg-white transition shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-8"
                        >
                            Secure Perimeter ($39/mo)
                        </button>

                        <ul className="space-y-4 text-sm text-white">
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span className="font-bold">Quarterly Defensive Treatments</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Unlimited Free Re-Services</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Full Yard Inspection & Granulation</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Eave Sweeping (Up to 20ft)</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Interior Treatment (On Request)</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Covers 40+ Common Pests</span></li>
                        </ul>
                    </div>

                    {/* OPTION 3: THE BUNKER (Pro) */}
                    <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-xl border border-neutral-100 dark:border-white/10 relative group hover:border-apex-navy/20 dark:hover:border-apex-gold/50 transition-all">
                        <h3 className="text-2xl font-bold text-apex-navy dark:text-white mb-2">Total Bunker</h3>
                        <div className="text-4xl font-black text-apex-navy dark:text-white mb-6">$59<span className="text-lg font-medium text-neutral-400">/mo</span></div>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-8 h-12">For larger estates or those requiring specialized mosquito & flea defense.</p>

                        <button
                            id="ghl-btn-bunker"
                            className="w-full py-4 rounded-lg font-bold border-2 border-neutral-200 text-neutral-600 hover:border-apex-navy hover:text-apex-navy dark:border-white/20 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white transition mb-8"
                        >
                            Max Protection
                        </button>

                        <ul className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Everything in Fortress Shield</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Mosquito Reduction Mist</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Flea & Tick Yard Shield</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="text-apex-gold shrink-0" size={18} /> <span>Priority Scheduling</span></li>
                        </ul>
                    </div>
                </div>

                {/* DETAILED PEST LIST */}
                <div className="mt-20 border-t border-neutral-200 dark:border-white/10 pt-16">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">The "Hit List"</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto">
                        {["Ants", "Spiders", "Roaches", "Silverfish", "Earwigs", "Crickets", "Millipedes", "Centipedes", "Wasps", "Hornets", "Mice (Interior)", "Rats (Exterior)", "Fleas (Bunker)", "Ticks (Bunker)", "Mosquitoes (Bunker)", "Beetles"].map((pest) => (
                            <div key={pest} className="flex items-center gap-2 p-3 bg-white dark:bg-white/5 rounded-lg border border-neutral-100 dark:border-white/5 shadow-sm">
                                <Zap size={14} className="text-apex-gold" />
                                {pest}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
