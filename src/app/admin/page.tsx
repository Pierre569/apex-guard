"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { Phone, Clock, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface Lead {
    id: string;
    customerPhone: string;
    summary: string;
    status: string;
    createdAt: Timestamp;
}

interface HealthStatus {
    status: string;
    timestamp: string;
    checks: Record<string, string>;
    warnings: string[];
}

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [health, setHealth] = useState<HealthStatus | null>(null);

    useEffect(() => {
        // 1. Real-time Leads
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lead[]);
            setLoading(false);
        });

        // 2. System Health Check
        fetch('/api/health').then(res => res.json()).then(data => setHealth(data));

        return () => unsubscribe();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-800 dark:text-slate-200 p-6 md:p-12">
                <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase text-apex-navy dark:text-white">Live Leads</h1>
                        <p className="text-slate-500">Real-time feed from Vapi & Website</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* System Health Widget */}
                        <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 text-sm font-bold ${health?.status === 'online'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400'
                        {/* The old System Health Widget was here, now it's part of the grid below */}
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            LIVE
                        </div>
                    </div>
                </header>

                {/* --- ELITE SEO DASHBOARD --- */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* 1. Health Status (Existing, refactored) */}
                    <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">System Status</h2>
                        <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${health?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="font-bold text-slate-700 dark:text-slate-200 uppercase">{health?.status || 'Scanning...'}</span>
                        </div>
                    </div>

                    {/* 2. Rank Tracker (New) */}
                    <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
                            <span className="text-6xl">🏆</span>
                        </div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Google Authority</h2>

                        <div className="mb-2">
                            <div className="text-sm text-slate-500">Target: <strong className="text-slate-700 dark:text-slate-200">{rankData.keyword}</strong></div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-4xl font-black text-apex-navy dark:text-white">#{rankData.position}</span>
                                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">
                                    {rankData.change} this week
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                            <span className="text-slate-500">Map Pack Status:</span>
                            <span className="font-bold text-green-600 flex items-center gap-1">
                                ● {rankData.gmb_status}
                            </span>
                        </div>
                    </div>

                    {/* 3. Review Automation (New) */}
                    <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Review Flow</h2>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{rankData.reviews_last_7_days}</span>
                            <span className="text-xs text-slate-400">New Reviews (7d)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 mb-2">
                            <div className="bg-apex-gold h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500">
                            Auto-posted to Facebook & GBP ✅
                        </p>
                    </div>
                </div>

                {health && health.warnings && health.warnings.length > 0 && (
                    <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                        <strong>⚠️ System Alerts:</strong>
                        <ul className="list-disc pl-5 mt-1">
                            {health.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                )}

                <main className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex items-center gap-2 text-slate-400">
                            <Loader2 className="animate-spin" /> Loading data...
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left bg-transparent">
                                    <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 text-xs uppercase text-slate-500 font-bold">
                                        <tr>
                                            <th className="p-4 pl-6">Status</th>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Summary</th>
                                            <th className="p-4">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {leads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                                <td className="p-4 pl-6">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold uppercase ${lead.status === 'booked' ? 'bg-green-100 text-green-700' :
                                                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {lead.status === 'booked' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold font-mono text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={14} className="text-slate-400" />
                                                        {lead.customerPhone}
                                                    </div>
                                                </td>
                                                <td className="p-4 max-w-md">
                                                    <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                                                        {lead.summary}
                                                    </p>
                                                </td>
                                                <td className="p-4 text-xs text-slate-400 whitespace-nowrap">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {leads.length === 0 && (
                                <div className="p-12 text-center text-slate-400">
                                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No leads yet. Call the AI!</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
