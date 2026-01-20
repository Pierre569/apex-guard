"use client";
import { siteConfig } from "@/config/site";

import Image from "next/image";

import OneShot from "@/components/OneShot";
import { useState } from "react";
import BookingForm from "@/components/BookingForm";
import CalendarWidget from "@/components/CalendarWidget";
import { CheckCircle2, Phone, Mail } from "lucide-react";
import clsx from "clsx";
import dynamic from 'next/dynamic';

const ServiceMap = dynamic(() => import('@/components/ServiceMap'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-neutral-900 animate-pulse rounded-xl flex items-center justify-center text-white/20">Loading Map...</div>
});

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState<"message" | "calendar">("message");

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pt-32 pb-20 transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
                {/* Left: Copy */}
                <div>
                    <OneShot>
                        <div className="relative w-20 h-20 mb-6 opacity-90">
                            <Image
                                src="/logo.png"
                                alt="ApexGuard Logo"
                                fill
                                className="object-contain" // Left aligned
                            />
                        </div>
                        <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">Get In Touch</span>
                        <h1 className="text-5xl font-black mt-4 mb-6 leading-tight">Request Service / Get a Quote</h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-md">
                            If you’re ready to protect your home or business with a licensed and insured company built for long-term defense—ApexGuard is ready.
                        </p>

                        <div className="space-y-4 mb-12">
                            <div className="flex items-center gap-3 font-bold text-apex-navy dark:text-white">
                                <CheckCircle2 className="text-apex-gold" /> Raleigh • Durham • Apex • Cary
                            </div>
                            <div className="flex items-center gap-3 font-bold text-apex-navy dark:text-white">
                                <CheckCircle2 className="text-apex-gold" /> Residential + Commercial
                            </div>
                            <div className="flex items-center gap-3 font-bold text-apex-navy dark:text-white">
                                <CheckCircle2 className="text-apex-gold" /> Year-Round Protection Plans
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-white/10 max-w-md">
                            <h3 className="font-bold text-lg mb-4 text-apex-navy dark:text-white">Direct Contact</h3>
                            <div className="space-y-3">
                                <a href={siteConfig.phoneLink} className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-apex-gold dark:hover:text-apex-gold transition">
                                    <Phone size={20} /> {siteConfig.phone}
                                </a>
                                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-apex-gold dark:hover:text-apex-gold transition">
                                    <Mail size={20} /> {siteConfig.email}
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl overflow-hidden border border-neutral-100 dark:border-white/10 shadow-sm">
                            <ServiceMap />
                        </div>
                    </OneShot>
                </div>

                <div className="relative">
                    <OneShot delay={0.2}>
                        {/* Content Area */}
                        <div className="bg-white dark:bg-white/5 p-2 rounded-3xl shadow-2xl border border-neutral-100 dark:border-white/10 overflow-hidden min-h-[800px]">
                            {activeTab === "message" ? (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                                    <BookingForm onSuccess={() => setActiveTab("calendar")} />
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                                    <CalendarWidget />
                                </div>
                            )}
                        </div>
                    </OneShot>
                </div>
            </div>

        </div>
    );
}
