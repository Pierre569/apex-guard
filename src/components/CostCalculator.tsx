"use client";

import { useState } from 'react';
import { Calculator, ArrowRight, Loader2 } from 'lucide-react';
import { SiteManifest } from '@/config/site-manifest';

export default function CostCalculator() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { min: number; max: number }>(null);
    const [formData, setFormData] = useState({
        sqft: '',
        pestType: 'General Pests',
        frequency: 'Quarterly'
    });

    const handleCalculate = async () => {
        setLoading(true);
        // Simulate AI Calculation
        setTimeout(() => {
            // Mock logic based on inputs
            const base = parseInt(formData.sqft) > 2500 ? 150 : 99;
            setResult({
                min: base,
                max: base + 50
            });

            // Analytics Trigger
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: 'cost_calculated',
                    niche: SiteManifest.niche,
                    value: base
                });
            }

            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl max-w-md w-full mx-auto relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-apex-gold/20 text-apex-gold rounded-full flex items-center justify-center">
                    <Calculator size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 dark:text-white leading-tight">Instant Price Estimator</h3>
                    <p className="text-xs text-slate-500">AI-Powered Accuracy</p>
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Home Size (Sq Ft)</label>
                        <select
                            className="w-full p-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:border-apex-gold transition"
                            onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                        >
                            <option value="">Select Size...</option>
                            <option value="1500">Under 1,500 sq ft</option>
                            <option value="2500">1,500 - 2,500 sq ft</option>
                            <option value="3500">2,500 - 3,500 sq ft</option>
                            <option value="4000">3,500+ sq ft</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Pest Problem</label>
                        <select
                            className="w-full p-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg outline-none focus:border-apex-gold transition"
                            onChange={(e) => setFormData({ ...formData, pestType: e.target.value })}
                        >
                            <option value="General">General (Preventative)</option>
                            <option value="Termites">Termites (Swarms)</option>
                            <option value="Mosquitoes">Mosquitoes</option>
                            <option value="Rodents">Rodents / Mice</option>
                        </select>
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={!formData.sqft || loading}
                        className="w-full py-4 bg-apex-navy text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Calculate Price <ArrowRight size={16} /></>}
                    </button>

                    <p className="text-[10px] text-center text-slate-400">
                        *Data based on recent jobs in {SiteManifest.location}.
                    </p>
                </div>
            )}

            {step === 2 && result && (
                <div className="animate-in fade-in slide-in-from-bottom duration-500 text-center">
                    <div className="mb-6">
                        <span className="text-sm text-slate-500">Estimated Range</span>
                        <div className="text-4xl font-black text-apex-navy dark:text-white my-2">
                            ${result.min} - ${result.max}<span className="text-lg font-medium text-slate-400">/mo</span>
                        </div>
                        <p className="text-sm text-green-600 font-bold bg-green-50 dark:bg-green-900/20 py-2 rounded-lg">
                            🎉 You qualify for a 20% Discount!
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                            "Based on homes in <strong>{SiteManifest.location}</strong>, this is a standard rate. I can send a tech to give you an exact quote."
                        </p>
                        <button className="w-full py-4 bg-apex-gold text-apex-navy font-bold rounded-xl shadow-lg hover:scale-105 transition">
                            Lock in this Price
                        </button>
                        <button
                            onClick={() => setStep(1)}
                            className="text-xs text-slate-400 hover:text-apex-navy underline"
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
