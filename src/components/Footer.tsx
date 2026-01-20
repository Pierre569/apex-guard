import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-apex-navy text-neutral-400 py-12 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/logo.png"
                                alt="ApexGuard Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Apex<span className="text-apex-gold">Guard</span></span>
                    </Link>
                    <p className="text-sm max-w-sm mb-6">
                        Defending North Carolina homes with military-grade precision.
                        Your perimeter is our priority.
                        <br />
                        <a href="tel:9103879259" className="font-bold text-apex-gold hover:underline mt-2 inline-block">
                            (910) 387 9259
                        </a>
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-apex-gold">
                        <ShieldCheck size={14} />
                        Licensed & Insured
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold mb-4">Mission</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-white transition">About Duty</Link></li>
                        <li><Link href="/#services" className="hover:text-white transition">Services</Link></li>
                        <li><Link href="/pricing" className="hover:text-white transition">Pricingplans</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition">Intel Center</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link href="/cookies" className="hover:text-white transition">Cookie Settings</Link></li>
                        <li><Link href="/privacy/request" className="hover:text-white transition">Your Privacy Rights (Do Not Sell)</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center bg-transparent">
                <p>&copy; {new Date().getFullYear()} ApexGuard Pest Defense. All rights reserved.</p>
                <p className="mt-2 md:mt-0 opacity-50">Designed for High-End Protection.</p>
            </div>
        </footer>
    );
}
