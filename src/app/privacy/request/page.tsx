"use client";

import { useState } from "react";
import OneShot from "@/components/OneShot";
import { ShieldAlert, Loader2, CheckCircle, Lock } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clsx from "clsx";

export default function PrivacyRequestPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Simple state just for this form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        requestType: "Do Not Sell My Info",
        details: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to 'privacy_requests' collection
            await addDoc(collection(db, "privacy_requests"), {
                ...formData,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setSuccess(true);
        } catch (error) {
            console.error("Privacy Request Error:", error);
            alert("Failed to submit request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-apex-navy text-apex-navy dark:text-white p-6">
                <div className="text-center max-w-lg">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-black mb-4">Request Logged</h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                        Your privacy request has been securely recorded. Our compliance team will process it within the legally required timeframe (usually 45 days). You will receive a confirmation email shortly.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-apex-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-neutral-800 transition"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-2xl mx-auto px-6">
                <OneShot>
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-apex-navy/5 dark:bg-white/10 text-apex-navy dark:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-4xl font-black mb-4">Privacy Request Portal</h1>
                        <p className="text-neutral-600 dark:text-neutral-300">
                            Submit a request regarding your personal data. We take your rights seriously.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-white/10 space-y-6">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">First Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold dark:text-white transition"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold dark:text-white transition"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold dark:text-white transition"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Request Type</label>
                            <select
                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold dark:text-white transition cursor-pointer"
                                value={formData.requestType}
                                onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                            >
                                <option>Do Not Sell My Info</option>
                                <option>Delete My Data</option>
                                <option>Download/Access My Data</option>
                                <option>Correction Request</option>
                                <option>Limit Use of Sensitive Info</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Additional Details (Optional)</label>
                            <textarea
                                rows={4}
                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-apex-gold dark:text-white transition resize-none"
                                placeholder="Any specific details about your request..."
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 border-t border-neutral-100 dark:border-white/10">
                            <button
                                type="submit"
                                disabled={loading}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2",
                                    loading
                                        ? "bg-neutral-200 text-neutral-400 dark:bg-white/10"
                                        : "bg-apex-gold text-apex-navy hover:scale-[1.02]"
                                )}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Submit Request"}
                            </button>
                            <p className="text-center text-xs text-neutral-400 mt-4">
                                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                            </p>
                        </div>

                    </form>
                </OneShot>
            </div>
        </div>
    );
}
