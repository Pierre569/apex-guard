"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, AlertTriangle, ShieldAlert, Crosshair, Droplet, Skull } from "lucide-react";
import Link from "next/link";
import OneShot from "./OneShot";
import Image from "next/image";

const PESTS = [
    {
        id: "ants",
        name: "Ants",
        icon: Bug,
        level: "MODERATE",
        color: "text-yellow-500",
        description: "Persistent colonies that compromise food storage and hygiene. Often a sign of deeper moisture issues.",
        solution: "Perimeter Liquid Defense + Baiting",
        image: "/images/pests/ants.png"
    },
    {
        id: "roaches",
        name: "Roaches",
        icon: ShieldAlert,
        level: "HIGH",
        color: "text-orange-600",
        description: "Rapid breeders carrying bacteria (E. coli, Salmonella). They thrive in hidden, damp areas.",
        solution: "Flush & Vacuum + Growth Regulators",
        image: "/images/pests/roaches.png"
    },
    {
        id: "spiders",
        name: "Spiders",
        icon: Crosshair,
        level: "MODERATE",
        color: "text-yellow-500",
        description: "Venomous species like Black Widows pose direct threats. Webs indicate high insect activity.",
        solution: "De-Webbing + Crack & Crevice Treatment",
        image: "/images/pests/spiders.png"
    },
    {
        id: "mosquitoes",
        name: "Mosquitoes",
        icon: Droplet,
        level: "HIGH",
        color: "text-orange-600",
        description: "Disease vectors that ruin outdoor living. Breeding sites often go unnoticed by homeowners.",
        solution: "Larvicide + Fogging Treatment",
        image: "/images/pests/mosquitoes.png"
    },
    {
        id: "termites",
        name: "Termites",
        icon: Skull,
        level: "CRITICAL",
        color: "text-red-600",
        description: "The 'Silent Destroyers'. They cause structural damage from the inside out before you see them.",
        solution: "Trelona® Bait System + Trenching",
        image: "/images/pests/termites.png"
    },
    {
        id: "rodents",
        name: "Rodents",
        icon: AlertTriangle,
        level: "CRITICAL",
        color: "text-red-600",
        description: "Destructive chewers of wires and insulation. Major fire hazard and disease carriers.",
        solution: "Exclusion + Bait Stations",
        image: "/images/pests/rodents.png"
    }
];

export default function PestIdentifier() {
    const [selectedPest, setSelectedPest] = useState<typeof PESTS[0] | null>(null);

    return (
        <section className="py-24 px-6 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

            <div className="max-w-6xl mx-auto relative z-10">
                <OneShot>
                    <div className="text-center mb-16">
                        <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">Threat Diagnostics</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4">IDENTIFY YOUR THREAT</h2>
                        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
                            Select a pest to analyze the risk level and deploy the correct ApexGuard countermeasure.
                        </p>
                    </div>
                </OneShot>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {PESTS.map((pest, i) => (
                            <OneShot key={pest.id} delay={i * 0.1}>
                                <button
                                    onClick={() => setSelectedPest(pest)}
                                    className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 flex flex-col items-center justify-center gap-4 transition-all duration-300 group ${selectedPest?.id === pest.id
                                        ? "border-apex-gold shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-105 z-10"
                                        : "border-white/10 hover:border-apex-gold/50"
                                        }`}
                                >
                                    {/* Cinematic Image Background (Ken Burns Effect) */}
                                    <div className="absolute inset-0 bg-neutral-900 z-0">
                                        <motion.div
                                            className="w-full h-full"
                                            animate={{
                                                scale: [1, 1.15],
                                                x: [0, -10],
                                            }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "linear"
                                            }}
                                        >
                                            <Image
                                                src={pest.image}
                                                alt={pest.name}
                                                fill
                                                className={`object-cover transition-opacity duration-500 ${selectedPest?.id === pest.id ? "opacity-60" : "opacity-30 group-hover:opacity-50"
                                                    }`}
                                            />
                                        </motion.div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    </div>

                                    {/* Icon & content */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <pest.icon size={32} className={`transition-colors drop-shadow-md ${selectedPest?.id === pest.id ? "text-apex-gold" : "text-white/80 group-hover:text-white"}`} />
                                        <span className={`font-bold text-sm uppercase tracking-wider mt-3 drop-shadow-md ${selectedPest?.id === pest.id ? "text-white" : "text-white/80"}`}>{pest.name}</span>
                                    </div>
                                </button>
                            </OneShot>
                        ))}
                    </div>

                    {/* RIGHT: INTEL PANEL */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {selectedPest ? (
                                <motion.div
                                    key={selectedPest.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white text-apex-navy rounded-3xl p-8 shadow-2xl border-l-8 border-apex-gold h-full"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-3xl font-black uppercase">{selectedPest.name}</h3>
                                        <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 ${selectedPest.level === "CRITICAL" ? "border-red-600 text-red-600 bg-red-50" :
                                            selectedPest.level === "HIGH" ? "border-orange-600 text-orange-600 bg-orange-50" :
                                                "border-yellow-600 text-yellow-600 bg-yellow-50"
                                            }`}>
                                            THREAT LEVEL: {selectedPest.level}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-bold text-neutral-400 text-xs uppercase tracking-widest mb-2">Intel Report</h4>
                                            <p className="text-lg font-medium leading-relaxed">{selectedPest.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-neutral-400 text-xs uppercase tracking-widest mb-2">ApexGuard Protocol</h4>
                                            <div className="p-4 bg-apex-navy/5 rounded-xl border border-apex-navy/10 flex items-center gap-3">
                                                <ShieldAlert className="text-apex-navy" />
                                                <span className="font-bold text-apex-navy">{selectedPest.solution}</span>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-neutral-100">
                                            <Link
                                                href="/contact"
                                                className="block w-full py-4 text-center bg-apex-navy text-white font-bold rounded-xl hover:bg-apex-gold hover:text-apex-navy transition-all shadow-lg"
                                            >
                                                Deploy Defense Against {selectedPest.name}
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                                    <Crosshair size={64} className="text-white/20 mb-6" />
                                    <h3 className="text-2xl font-bold text-white/50">Awaiting Target Selection</h3>
                                    <p className="text-white/30 mt-2">Click a pest from the grid to analyze the threat.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
