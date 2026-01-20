"use client";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingCall() {
    return (
        <a
            href={siteConfig.phoneLink}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 sm:hidden"
            aria-label="Call Apex Guard"
        >
            <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-25"></span>
            <Phone className="w-6 h-6" />
        </a>
    );
}
