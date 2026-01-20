"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link"; // Added Link import

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const yBackend = useTransform(scrollY, [0, 1000], [0, 400]);
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

    // Bug system state
    const [bugs, setBugs] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);

    // Spawn bugs on mount
    useEffect(() => {
        const newBugs = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            rotate: Math.random() * 360,
        }));
        setBugs(newBugs);
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-apex-navy -ml-[50vw] left-1/2">
            {/* 1. BACKGROUND VIDEO (The "Environment") */}
            <motion.div
                style={{ y: yBackend }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-apex-navy via-apex-navy/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* 2. REACTIVE PARTICLES (The "Mist") - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-apex-gold/10 rounded-full blur-3xl"
                        style={{
                            width: Math.random() * 300 + 100,
                            height: Math.random() * 300 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* 3. SCATTERING BUGS (The "Invaders") */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-40">
                {bugs.map((bug) => (
                    <motion.div
                        key={bug.id}
                        className="absolute w-2 h-2 bg-black rounded-full shadow-sm"
                        style={{ left: `${bug.x}%`, top: `${bug.y}%`, rotate: bug.rotate }}
                        // Bugs scatter away when user scrolls
                        animate={{
                            x: [0, (Math.random() - 0.5) * 200],
                            y: [0, (Math.random() - 0.5) * 200],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 2 + 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </div>

            {/* 4. HERO CONTENT (The "Defense") */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
                <motion.div style={{ y: yText, opacity: opacityText }} className="max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-apex-gold text-sm font-bold uppercase tracking-widest backdrop-blur-md mb-8"
                    >
                        <ShieldCheck size={16} />
                        ApexGuard Protection Tech
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-8 drop-shadow-2xl"
                    >
                        YOUR HOME <br /> IS YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-gold to-yellow-600">FORTRESS.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md"
                    >
                        Elite, protection-first pest control tailored for precise, disciplined defense. We stop pests at the source.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link
                            href="/contact"
                            className="bg-apex-gold hover:bg-white hover:text-apex-navy text-apex-navy font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/services"
                            className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg py-4 px-10 rounded-xl transition-all backdrop-blur-sm"
                        >
                            Explore Services
                        </Link>
                    </motion.div>

                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </div>
        </div>
    );
}
