"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("apex-cookie-consent");
        if (!consent) {
            // Delay slightly for UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("apex-cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("apex-cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-[60] p-6 bg-white rounded-2xl shadow-2xl border border-neutral-100"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-apex-navy font-bold">
                            <Cookie className="text-apex-gold" size={20} />
                            <span>Cookie Settings</span>
                        </div>
                        <button onClick={handleDecline} className="text-neutral-400 hover:text-apex-navy">
                            <X size={20} />
                        </button>
                    </div>

                    <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                        We use cookies to improve your defense strategy. Essential cookies are required, but you can choose to accept analytics and marketing cookies.
                        <Link href="/cookies" className="text-apex-gold hover:underline ml-1 font-medium">Read Policy</Link>.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleAccept}
                            className="w-full py-3 rounded-lg bg-apex-navy text-white font-bold hover:bg-neutral-800 transition shadow-lg shadow-apex-navy/20"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={handleDecline}
                            className="w-full py-3 rounded-lg bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition"
                        >
                            Necessary Only
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
