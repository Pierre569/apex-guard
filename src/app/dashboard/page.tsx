"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { Phone, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface Lead {
    id: string;
    customerPhone: string;
    summary: string;
    status: string;
    createdAt: Timestamp;
}

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener
        const q = query(
            collection(db, 'leads'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const leadsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Lead[];
            setLeads(leadsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-800 dark:text-slate-200 p-6 md:p-12">
                <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black uppercase text-apex-navy dark:text-white">Live Leads</h1>
                        <p className="text-slate-500">Real-time feed from Vapi & Website</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        LIVE
                    </div>
                </header>

                <main className="max-w-7xl mx-auto">
                    {loading ? (
                        <p>Loading leads...</p>
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
