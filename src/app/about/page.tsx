"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OneShot from "@/components/OneShot";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-apex-navy font-sans text-apex-navy dark:text-white transition-colors duration-300">

            {/* 1. HERO SECTION */}
            <section className="pt-40 pb-20 px-6 bg-apex-navy text-white relative overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apex-gold/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <OneShot>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-apex-gold text-xs font-bold uppercase tracking-widest mb-8">
                            <Shield size={14} />
                            Built For Protection
                        </div>
                    </OneShot>
                    <OneShot delay={0.2}>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tight">
                            APEXGUARD. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-gold to-yellow-600">
                                BUILT TO PROTECT.
                            </span>
                        </h1>
                    </OneShot>
                    <OneShot delay={0.4}>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                            Your property is more than a place—it’s where life happens. We exist to provide elite, year-round pest defense for those who demand discipline and precision.
                        </p>
                    </OneShot>
                </div>
            </section>

            {/* 2. FOUNDER SECTION */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* Image / Visual Column */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-apex-gold/10 rounded-3xl transform rotate-3" />
                        <div className="relative bg-white dark:bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 dark:border-white/10 aspect-[4/5] flex items-end p-8">
                            {/* Visual Placeholder for Kenneth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-apex-navy/80 to-transparent z-10" />
                            {/* If you have a real image of Kenneth, use Next/Image here. For now, a styled placeholder or generic robust imagery. */}
                            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />

                            <div className="relative z-20 text-white">
                                <p className="text-apex-gold font-bold tracking-widest uppercase mb-1">Meet The Founder</p>
                                <h3 className="text-4xl font-black">Kenneth</h3>
                                <p className="text-lg opacity-90 mt-2">NC Native • Military Veteran</p>
                            </div>
                        </div>
                    </div>

                    {/* Copy Column */}
                    <div className="prose prose-lg prose-neutral dark:prose-invert">
                        <OneShot>
                            <h2 className="text-4xl font-black text-apex-navy dark:text-white mb-6">Protection. Discipline. Responsibility.</h2>

                            <p className="lead text-xl font-medium text-neutral-600 dark:text-neutral-400">
                                My name is Kenneth, founder of ApexGuard. I’m a North Carolina native and a military veteran, and I built this company with a mindset I’ve lived by for years.
                            </p>

                            <p>
                                I started ApexGuard because too many homeowners were being offered temporary fixes—services that looked good upfront but didn’t actually solve the root cause. A "spray-and-go" company will never protect a property long-term.
                            </p>

                            <h4 className="text-apex-navy dark:text-white font-bold mt-8">Why I Started ApexGuard</h4>
                            <p>
                                A lot of companies focus on one thing: getting in, spraying, and leaving.
                                At ApexGuard, we focus on what actually matters:
                            </p>

                            <ul className="space-y-2 mt-4 list-none pl-0">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-apex-gold" size={20} /> Finding how pests are getting in</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-apex-gold" size={20} /> Identifying what’s attracting them</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-apex-gold" size={20} /> Eliminating the problem at the source</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-apex-gold" size={20} /> Reducing the chances of repeat issues</li>
                            </ul>

                            <p className="mt-8 font-medium border-l-4 border-apex-gold pl-6 py-2 bg-apex-gold/5 dark:bg-apex-gold/10 rounded-r-lg dark:text-neutral-300">
                                "Your home isn’t just a building—it’s where your family lives, rests, and feels safe. We treat it that way."
                            </p>
                        </OneShot>
                    </div>
                </div>
            </section>

            {/* 3. WHAT MAKES US DIFFERENT */}
            <section className="py-24 px-6 bg-white dark:bg-apex-navy/50 border-y border-neutral-100 dark:border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="relative w-20 h-20 mx-auto mb-6 opacity-80">
                            <Image
                                src="/logo.png"
                                alt="ApexGuard Shield"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-4xl font-black text-apex-navy dark:text-white mb-4">What Makes ApexGuard Different</h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            When you work with ApexGuard, you’re not getting a one-size-fits-all service. You’re getting a protection plan built around your home.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "No One-Size-Fits-All", desc: "Targeted treatments, not random sprays.", icon: Target },
                            { title: "Respect For Your Home", desc: "We treat your property inside and out with care.", icon: Shield },
                            { title: "Calm & Professional", desc: "No stress, no confusion, just clear communication.", icon: Users },
                        ].map((item, i) => (
                            <OneShot key={i} delay={i * 0.1}>
                                <div className="bg-neutral-50 dark:bg-white/5 p-8 rounded-2xl border border-neutral-100 dark:border-white/10 hover:border-apex-gold/30 hover:shadow-xl transition-all h-full">
                                    <div className="w-14 h-14 bg-apex-navy dark:bg-white/10 rounded-xl flex items-center justify-center text-apex-gold mb-6 shadow-lg shadow-apex-navy/20 dark:shadow-none">
                                        <item.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-apex-navy dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </OneShot>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SAFETY & PROMISE */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <OneShot>
                        <div className="mb-12">
                            <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">Our Promise</span>
                            <h2 className="text-4xl md:text-5xl font-black text-apex-navy dark:text-white mt-4 mb-6">Safety Comes First</h2>
                            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                We understand homes include children, pets, guests, and daily routines. That’s why we focus on solutions that are <strong>smart, controlled, and homeowner-friendly.</strong>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {["Honesty", "Consistency", "Strong Results", "Long-Term Protection"].map((val, i) => (
                                <div key={i} className="p-6 bg-white dark:bg-white/5 rounded-xl shadow-md border border-neutral-100 dark:border-white/10 font-bold text-apex-navy dark:text-white">
                                    <div className="text-apex-gold mb-2 mx-auto"><CheckCircle2 className="mx-auto" /></div>
                                    {val}
                                </div>
                            ))}
                        </div>
                    </OneShot>
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="bg-apex-gold py-20 px-6 text-center">
                <h2 className="text-4xl font-black text-apex-navy mb-6">READY TO PROTECT YOUR HOME?</h2>
                <p className="text-apex-navy/80 text-xl max-w-2xl mx-auto mb-10 font-medium">
                    If you want pest control handled with discipline, care, and real solutions—ApexGuard is ready.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/contact" className="inline-block bg-apex-navy text-white font-bold py-4 px-12 rounded-lg shadow-xl hover:bg-neutral-800 transition">
                        Get a Quote
                    </Link>
                    <Link href="/contact" className="inline-block bg-white/20 text-apex-navy border-2 border-apex-navy font-bold py-4 px-12 rounded-lg hover:bg-white/40 transition">
                        Speak With Our Team
                    </Link>
                </div>
            </section>

        </div>
    );
}
