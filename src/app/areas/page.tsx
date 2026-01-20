"use client";

import OneShot from "@/components/OneShot";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function AreasPage() {
    const cities = [
        { name: "Raleigh", desc: "Serving North Hills, Downtown, Brier Creek, and surrounding neighborhoods." },
        { name: "Durham", desc: "Covering Southpoint, Duke Park, and the Research Triangle Park area." },
        { name: "Apex", desc: "Our home base. Protecting the Peak of Good Living." },
        { name: "Cary", desc: "Full coverage for Preston, Lochmere, and West Cary." },
        { name: "Morrisville", desc: "Rapid response for the tech hub corridor." },
        { name: "Holly Springs", desc: "Deploying protection for growing families." },
        { name: "Fuquay-Varina", desc: "Expanding our perimeter to the southern wake area." },
        { name: "Wake Forest", desc: "North wake protection for heritage homes." },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <OneShot>
                        <h1 className="text-5xl font-black mb-6">AREAS WE PROTECT.</h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                            ApexGuard proudly provides elite pest protection across the Triangle. If you’re nearby, reach out—there’s a strong chance we can cover your location.
                        </p>
                    </OneShot>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city, i) => (
                        <OneShot key={city.name} delay={i * 0.05}>
                            <Link href="/contact" className="block group h-full">
                                <div className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-sm border border-neutral-100 dark:border-white/10 hover:border-apex-gold dark:hover:border-apex-gold transition-colors h-full relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold flex items-center gap-2 text-apex-navy dark:text-white">
                                            <MapPin className="text-apex-gold" size={24} />
                                            {city.name}
                                        </h3>
                                        <ArrowRight className="text-neutral-300 dark:text-neutral-500 group-hover:text-apex-gold group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                                        {city.desc}
                                    </p>
                                </div>
                            </Link>
                        </OneShot>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-apex-navy dark:text-white">Don't see your city?</h3>
                    <Link href="/contact" className="inline-block border-2 border-apex-navy text-apex-navy hover:bg-apex-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-apex-navy font-bold py-3 px-8 rounded-lg transition">
                        Check Availability
                    </Link>
                </div>
            </div>
        </div>
    );
}
