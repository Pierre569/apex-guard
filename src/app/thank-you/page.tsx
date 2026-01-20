"use client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">

                <div className="flex justify-center">
                    <CheckCircle className="h-20 w-20 text-green-500 animate-bounce" />
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    Photo Received!
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-lg">
                    Our AI specialist, <span className="text-blue-600 font-bold">Alex</span>, is analyzing your photo right now.
                </p>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                    <p className="text-blue-800 dark:text-blue-200 font-semibold">
                        🚀 Incoming Call in 60 Seconds
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Alex will be calling you from:
                        </p>
                        <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                            {siteConfig.phone}
                        </p>
                        <p className="text-xs mt-1 uppercase tracking-widest text-slate-400">
                            Save this number to your contacts
                        </p>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Please keep your phone nearby to discuss your free quote.
                    </p>
                </div>

                <Link href="/" className="inline-block text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    Back to Homepage
                </Link>
            </div>

            {/* Branding Footer */}
            <p className="mt-8 text-slate-400 text-sm">© 2026 {siteConfig.name}</p>
        </div>
    );
}
