"use client";

import { useState } from "react";
import OneShot from "@/components/OneShot";
import { Save, Cookie, Shield } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function CookieSettings() {
    const [settings, setSettings] = useState({
        essential: true,
        analytics: true,
        marketing: false,
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // In a real app, this would save to a cookie/localStorage
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6">
                <OneShot>
                    <div className="mb-12 text-center">
                        <div className="w-16 h-16 bg-apex-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-apex-gold">
                            <Cookie size={32} />
                        </div>
                        <h1 className="text-4xl font-black mb-4">Cookie Settings</h1>
                        <p className="text-neutral-600 dark:text-neutral-300">
                            Manage how we use cookies to improve your experience.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-white/5 rounded-3xl shadow-xl border border-neutral-100 dark:border-white/10 overflow-hidden">
                        {/* Essential */}
                        <div className="p-8 border-b border-neutral-100 dark:border-white/10">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Shield size={18} className="text-green-500" />
                                        Essential Cookies
                                    </h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                        Strictly necessary for the website to function (e.g., security, booking forms). These cannot be disabled.
                                    </p>
                                </div>
                                <div className="flex items-center h-6">
                                    <div className="w-11 h-6 bg-apex-gold rounded-full relative opacity-50 cursor-not-allowed">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analytics */}
                        <div className="p-8 border-b border-neutral-100 dark:border-white/10">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold">Analytics & Performance</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                        Help us understand how visitors interact with the website so we can improve our services.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, analytics: !settings.analytics })}
                                    className={clsx(
                                        "w-11 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-apex-gold focus:ring-offset-2 dark:focus:ring-offset-apex-navy",
                                        settings.analytics ? "bg-apex-gold" : "bg-neutral-200 dark:bg-white/20"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                            settings.analytics ? "left-6" : "left-1"
                                        )}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold">Marketing & Targeting</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                        Used to deliver advertisements more relevant to you and your interests.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, marketing: !settings.marketing })}
                                    className={clsx(
                                        "w-11 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-apex-gold focus:ring-offset-2 dark:focus:ring-offset-apex-navy",
                                        settings.marketing ? "bg-apex-gold" : "bg-neutral-200 dark:bg-white/20"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                            settings.marketing ? "left-6" : "left-1"
                                        )}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="p-8 bg-neutral-50 dark:bg-white/5 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between">
                            <Link href="/privacy" className="text-sm font-bold text-neutral-500 hover:text-apex-navy dark:hover:text-white transition">
                                View Privacy Policy
                            </Link>
                            <button
                                onClick={handleSave}
                                className="bg-apex-navy text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-800 transition shadow-lg"
                            >
                                {saved ? (
                                    <>Saved!</>
                                ) : (
                                    <><Save size={18} /> Save Preferences</>
                                )}
                            </button>
                        </div>
                    </div>
                </OneShot>
            </div>
        </div>
    );
}
