"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Auth listener in parent/layout will handle redirect or state change
        } catch (err: any) {
            console.error("Login Error:", err);
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black p-4">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 dark:border-white/10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-apex-navy/10 dark:bg-white/10 rounded-full mb-4">
                        <Lock className="text-apex-navy dark:text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-black text-apex-navy dark:text-white">Admin Access</h1>
                    <p className="text-slate-500">Secure entry for authorized personnel only.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black focus:outline-none focus:ring-2 focus:ring-apex-navy"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black focus:outline-none focus:ring-2 focus:ring-apex-navy"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-apex-navy text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verifying...' : 'Access Dashboard'}
                    </button>

                    <p className="text-xs text-center text-slate-400 pt-4">
                        Authorized Use Only. All access is logged.
                    </p>
                </form>
            </div>
        </div>
    );
}
