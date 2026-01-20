"use client";

import { useEffect, useState } from 'react';
import { SiteManifest } from '@/config/site-manifest';
import { MapPin, ShieldCheck, X } from 'lucide-react';

const MESSAGES = [
    `🏠 Just protected a home in ${SiteManifest.location}!`,
    `🪳 Termite Inspection completed in ${SiteManifest.location.split(',')[0]}`,
    `🐜 Ant Control service booked nearby`,
    `❄️ Winter Pest Prevention active in ${SiteManifest.location}`,
    `⭐️ New 5-Star Review received from a neighbor!`
];

export default function SocialProofPulse() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(MESSAGES[0]);

    const showRandomMessage = () => {
        setVisible(false);
        setTimeout(() => {
            const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
            setMessage(randomMsg);
            setVisible(true);

            // Auto hide after 5s
            setTimeout(() => setVisible(false), 5000);
        }, 500);
    };

    useEffect(() => {
        // Initial delay
        const initialTimer = setTimeout(() => {
            showRandomMessage();
        }, 5000);

        // Loop
        const interval = setInterval(() => {
            showRandomMessage();
        }, 15000 + Math.random() * 10000); // Random interval 15-25s

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom duration-500 fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-lg p-4 flex items-center gap-3 max-w-xs pr-8 relative">
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-1 right-1 text-slate-300 hover:text-slate-500 p-1"
                >
                    <X size={12} />
                </button>

                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-full">
                    <ShieldCheck size={20} />
                </div>

                <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                        {message}
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> Verified by Apex Guard
                    </p>
                </div>
            </div>
        </div>
    );
}
