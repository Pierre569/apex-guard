"use client";


import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Areas We Serve", href: "/areas" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen
                    ? "bg-apex-navy/95 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-apex-navy md:bg-transparent py-4 md:py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/logo.png"
                                alt="ApexGuard Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Apex<span className="text-apex-gold group-hover:text-white transition-colors">Guard</span>
                        </span>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-apex-gold ${pathname === link.href ? "text-apex-gold" : "text-neutral-300"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & MOBILE TOGGLE */}
                    <div className="hidden md:flex items-center gap-6">
                        <ThemeToggle />
                        <Link href={siteConfig.phoneLink} className="hidden lg:block font-medium text-neutral-300 hover:text-white transition text-xs">
                            {siteConfig.phone}
                        </Link>
                        <Link
                            href="/contact"
                            className="font-bold text-white hover:text-apex-gold transition-colors"
                        >
                            Get a Quote
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white hover:text-apex-gold transition p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[72px] z-40 bg-apex-navy/95 backdrop-blur-xl md:hidden flex flex-col pt-8 px-6"
                    >
                        <nav className="flex flex-col gap-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-bold ${pathname === link.href ? "text-apex-gold" : "text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center px-4">
                                <span className="text-sm text-neutral-400">Appearance</span>
                                <ThemeToggle />
                            </div>
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center bg-apex-gold text-apex-navy font-bold py-4 rounded-xl mt-4"
                            >
                                Get a Quote
                            </Link>
                            <div className="flex justify-center gap-4 text-neutral-400 mt-8">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} /> Licensed & Insured
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
