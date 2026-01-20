"use client";

import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Camera } from "lucide-react";

export default function PrepPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-800 dark:text-slate-200">
            {/* Header */}
            <header className="bg-apex-navy text-white text-center py-6 px-4">
                <h1 className="text-2xl font-bold uppercase tracking-wider">Apex Guard</h1>
                <p className="text-apex-gold text-sm font-medium opacity-90">Pre-Inspection Checklist</p>
            </header>

            <main className="max-w-2xl mx-auto p-6 pb-24">

                {/* Intro */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-black mb-2 dark:text-white">Getting Ready.</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Help us help you. A few simple steps ensure the most effective treatment possible.
                    </p>
                </div>

                {/* Checklist */}
                <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 p-6 mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-apex-gold" />
                        Please Complete Before Arrival
                    </h3>

                    <ul className="space-y-4">
                        {[
                            "Clear access to all baseboards and corners.",
                            "Remove pets from treatment areas (or secure in a room).",
                            "Clear items from under kitchen and bathroom sinks.",
                            "Cover open food containers or place in the fridge.",
                            "Unlock gates for exterior perimeter access.",
                            "Make a list of where you've seen activity."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
                                <div className="mt-1 h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                                <span className="text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Meet Your Tech */}
                <div className="bg-apex-navy text-white rounded-2xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-apex-gold rounded-full blur-[50px] opacity-20 -mr-10 -mt-10" />

                    <h3 className="font-bold text-lg mb-4 relative z-10">Meet Your Technician</h3>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">
                            PHOTO
                        </div>
                        <div>
                            <p className="font-bold text-xl">Mike D.</p>
                            <p className="text-apex-gold text-sm">Certified Senior Tech</p>
                            <p className="text-xs text-slate-300 mt-1">"I treat every home like my own grandmother lives there."</p>
                        </div>
                    </div>
                </div>

                {/* Bug ID CTA */}
                <div className="text-center">
                    <p className="text-sm text-slate-500 mb-4">See something new while prepping?</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-500/30 animate-pulse hover:bg-red-700 transition">
                        <Camera size={20} />
                        Text Us a Photo
                    </Link>
                </div>

            </main>

            {/* Footer / Contact */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 p-4 pb-6 mx-auto text-center md:hidden">
                <a href="tel:9195550123" className="text-apex-navy dark:text-white font-bold flex items-center justify-center gap-2">
                    <Phone size={18} /> Need to reschedule? Call us.
                </a>
            </div>
        </div>
    );
}
