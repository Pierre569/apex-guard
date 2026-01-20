"use client";

import React, { useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, Loader2 } from 'lucide-react';

// Initialize Vapi SDK
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'demo-public-key');

const BugIdentifier = () => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<{ pest: string; isDangerous: boolean; confidence: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');

    // Placeholder keys - replaced via .env.local
    const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'demo-assistant-id';

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optimistic UI preview
        setImage(URL.createObjectURL(file));
        setLoading(true);
        setResult(null);

        // Client-side WebP Conversion (Performance)
        const compressImage = (imageFile: File): Promise<string> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = URL.createObjectURL(imageFile);
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Resize logic (Max 800px width to save tokens/bandwidth)
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    const width = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                    const height = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;

                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to WebP at 0.7 quality
                    const dataUrl = canvas.toDataURL('image/webp', 0.7);
                    resolve(dataUrl.split(',')[1]); // Return base64 body only
                };
            });
        };

        try {
            const optimizedBase64 = await compressImage(file);
            const response = await fetch('/api/identify-pest', {
                method: 'POST',
                body: JSON.stringify({ image: optimizedBase64 }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error("ID Error:", err);
            // Fallback to raw if compression fails (rare)
        } finally {
            setLoading(false);
        }
    };

    /**
     * CONTEXT AWARE CALL HOOK (Recommendation #3)
     * Starts a call passing the pest metadata so the AI knows context.
     */
    const startContextCall = async () => {
        if (!result) return;

        setCallStatus('calling');

        try {
            await vapi.start(ASSISTANT_ID, {
                variableValues: {
                    detected_pest: result.pest,
                    danger_level: result.isDangerous ? "High" : "Low",
                    confidence: result.confidence
                }
            });
            setCallStatus('connected');

            // Listen for end of call to reset UI
            vapi.on('call-end', () => setCallStatus('idle'));

        } catch (e) {
            console.error("Call Failed", e);
            setCallStatus('idle');
            alert("Could not start call. Check console/keys.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 transition-all">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Free Bug Identifier</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Upload a photo to see if it&apos;s a threat to your home.</p>

            {!image ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group">
                    <span className="text-blue-500 group-hover:scale-105 transition-transform font-medium">Click to upload photo</span>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
            ) : (
                <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="Bug" className="w-full h-64 object-cover rounded-xl" />
                    {loading && (
                        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center rounded-xl backdrop-blur-sm">
                            <span className="font-bold text-slate-800 dark:text-white animate-pulse flex items-center gap-2">
                                <Loader2 className="animate-spin" /> Analyzing...
                            </span>
                        </div>
                    )}
                </div>
            )}

            {result && (
                <div className={`mt-6 p-6 rounded-xl border ${result.isDangerous ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs uppercase tracking-wide font-bold opacity-60 dark:text-white">Detected</p>
                            <p className="font-black text-2xl text-slate-800 dark:text-white">{result.pest.toUpperCase()}</p>
                        </div>
                        <span className="bg-white/50 dark:bg-black/20 px-2 py-1 rounded text-xs font-mono">{result.confidence}</span>
                    </div>

                    {result.isDangerous ? (
                        <div className="space-y-3">
                            <p className="text-sm text-red-700 dark:text-red-400 font-medium">⚠️ Threat detected. Recommend immediate inspection.</p>

                            {/* Context Aware Call Button */}
                            <button
                                onClick={startContextCall}
                                disabled={callStatus !== 'idle'}
                                className="w-full py-4 bg-red-600 text-white font-bold rounded-lg animate-pulse hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                            >
                                {callStatus === 'idle' ? (
                                    <>
                                        <Phone size={20} /> Talk to an Expert Now
                                    </>
                                ) : callStatus === 'calling' ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Connecting to AI...
                                    </>
                                ) : (
                                    "Call Connected"
                                )}
                            </button>
                            <p className="text-xs text-center text-slate-400">Wait time: Instant (AI Agent)</p>
                        </div>
                    ) : (
                        <p className="text-sm text-green-700 dark:text-green-400 font-medium">This looks like a common outdoor insect. No immediate action needed.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BugIdentifier;
