"use client";

import { useState } from "react";

import { Loader2, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import clsx from "clsx";



interface BookingFormProps {
    onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        serviceType: "General Pest Control",
        issue: "",
        callMe: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Send to Backend API (Handles Firebase + GHL)
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Booking failed');

            setSuccess(true);
            setFormData({ name: "", phone: "", email: "", serviceType: "General Pest Control", issue: "", callMe: false });
        } catch (err) {
            console.error("Booking Error:", err);
            setError("Something went wrong. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-apex-navy dark:text-white mb-2">Request Received!</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    We&apos;ve received your booking request. One of our specialists will call you shortly to confirm the appointment time.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {onSuccess && (
                        <button
                            onClick={onSuccess}
                            className="w-full bg-apex-gold text-apex-navy font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition-transform animate-pulse"
                        >
                            Schedule Appointment Now
                        </button>
                    )}
                    <button
                        onClick={() => setSuccess(false)}
                        className="text-neutral-400 font-bold hover:text-apex-navy dark:hover:text-white text-sm"
                    >
                        Book another service
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-apex-navy dark:text-white flex items-center gap-2">
                    <Calendar className="text-apex-gold" size={20} />
                    Request Service
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Fill out the form below and we&apos;ll get back to you instantly.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Name</label>
                        <input
                            name="name"
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold transition dark:text-white"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Phone</label>
                            <input
                                name="phone"
                                required
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold transition dark:text-white"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Email</label>
                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold transition dark:text-white"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Service Needed</label>
                        <select
                            name="serviceType"
                            className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold transition dark:text-white"
                            value={formData.serviceType}
                            onChange={handleChange}
                        >
                            <option>General Pest Control</option>
                            <option>Termite Inspection</option>
                            <option>Mosquito Defense</option>
                            <option>Rodent Exclusion</option>
                            <option>Other / Custom Quote</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Describe Issue (Optional)</label>
                        <textarea
                            name="issue"
                            rows={3}
                            placeholder="Saw ants in the kitchen..."
                            className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold transition dark:text-white resize-none"
                            value={formData.issue}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-apex-navy/5 dark:bg-apex-gold/10 rounded-lg border border-apex-gold/20">
                        <input
                            type="checkbox"
                            id="callMe"
                            name="callMe"
                            className="w-4 h-4 text-apex-gold rounded focus:ring-apex-gold"
                            onChange={(e) => setFormData({ ...formData, callMe: e.target.checked })}
                        />
                        <label htmlFor="callMe" className="text-sm font-bold text-apex-navy dark:text-apex-gold cursor-pointer">
                            Call me immediately to confirm
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm flex items-center gap-2 mt-2">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <div className="mt-auto pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={clsx(
                            "w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2",
                            loading
                                ? "bg-neutral-200 text-neutral-400 dark:bg-white/10"
                                : "bg-apex-gold text-apex-navy hover:scale-[1.02] hover:shadow-apex-gold/20"
                        )}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Book Inspection"}
                    </button>
                    <div className="mt-3 text-[10px] text-neutral-400 leading-tight">
                        By clicking &quot;Book Inspection&quot;, you agree to receive automated texts/calls from Apex Guard at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.
                        <br />
                        <a href="/sms-policy" className="underline hover:text-apex-navy dark:hover:text-white">Privacy Policy</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
