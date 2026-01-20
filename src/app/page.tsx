"use client";

import Hero from "@/components/Hero";
import OneShot from "@/components/OneShot";
import Link from "next/link";
import { CheckCircle2, Shield, Target, Lock, ArrowRight } from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator";
import Reviews from "@/components/Reviews";
import BugIdentifier from "@/components/BugIdentifier";
import NeighborhoodTicker from "@/components/NeighborhoodTicker";
import dynamic from 'next/dynamic';

const ServiceMap = dynamic(() => import('@/components/ServiceMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-neutral-900 animate-pulse rounded-xl flex items-center justify-center text-white/20">Loading Map...</div>
});

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-neutral-50 dark:bg-black text-apex-navy dark:text-neutral-200 transition-colors duration-300">
      {/* 2.5 NEIGHBORHOOD TICKER (Enterprise) */}
      <NeighborhoodTicker />

      {/* 1. HERO */}
      <Hero />

      {/* 2. TRUST BAR */}
      <div className="bg-apex-navy text-white text-center py-4 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base font-bold tracking-widest uppercase opacity-80">
          <span>Licensed & Insured</span>
          <span className="hidden md:inline">•</span>
          <span>Veteran-Owned</span>
          <span className="hidden md:inline">•</span>
          <span>Year-Round Protection</span>
          <span className="hidden md:inline">•</span>
          <span>Residential + Commercial</span>
        </div>
      </div>

      {/* 3. VALUE PROPOSITION */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <OneShot>
            <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">A Higher Standard</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8">PROTECTION WITHOUT GUESSWORK.</h2>
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Most pest control companies treat symptoms. We eliminate entry points, target activity zones, and reinforce your property like a perimeter—built for long-term defense.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Precision", text: "Targeted application, not random spraying." },
                { icon: Shield, title: "Professionalism", text: "Uniformed, trained, and respectful experts." },
                { icon: Lock, title: "Consistency", text: "Reliable scheduling you can set your watch to." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-neutral-100 dark:border-white/10 transition-colors">
                  <item.icon className="mx-auto text-apex-gold mb-4" size={32} />
                  <h3 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link href="/about" className="text-apex-gold font-bold hover:text-apex-navy dark:hover:text-white transition flex items-center justify-center gap-2">
                Meet The Founder <ArrowRight size={18} />
              </Link>
            </div>
          </OneShot>
        </div>
      </section>

      {/* 4.5 BUG IDENTIFIER (Gemini Lead Magnet) */}
      <section className="py-12 px-6 bg-blue-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-black mb-4 dark:text-white">Found a Bug? Identify it Instantly.</h2>
          <p className="text-neutral-500 dark:text-neutral-400">Upload a photo and let our AI tell you if it's a threat.</p>
        </div>
        <BugIdentifier />
      </section>

      {/* 4. SERVICES SNAPSHOT */}
      <section className="py-24 px-6 bg-white dark:bg-white/5 border-y border-neutral-100 dark:border-white/5 transition-colors">
        <div className="max-w-6xl mx-auto">
          <OneShot>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 dark:text-white">Protection Plans Built for Real Properties</h2>
              <p className="text-neutral-500 dark:text-neutral-400">Defending homes and businesses across the Triangle.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Residential */}
              <div className="bg-neutral-50 dark:bg-white/5 p-8 rounded-3xl hover:shadow-xl transition-all border border-neutral-100 dark:border-white/10 group">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-apex-gold transition-colors dark:text-white">Residential</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 border-b border-neutral-200 dark:border-white/10 pb-8 min-h-[80px]">Keep your home defended against seasonal pests and repeat infestations.</p>
                <ul className="space-y-3 mb-8 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Seasonal Defense</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Family Safe</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Unlimited Re-Service</li>
                </ul>
                <Link href="/services" className="block w-full py-3 text-center border-2 border-apex-navy dark:border-white text-apex-navy dark:text-white font-bold rounded-lg hover:bg-apex-navy hover:text-white dark:hover:bg-white dark:hover:text-apex-navy transition">
                  View Plans
                </Link>
              </div>

              {/* Commercial */}
              <div className="bg-apex-navy p-8 rounded-3xl hover:shadow-xl transition-all border border-apex-navy text-white relative overflow-hidden transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-apex-gold rounded-full blur-[60px] opacity-20 -mr-10 -mt-10" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-apex-green to-teal-400">
                  World&apos;s Smartest Pest Control
                </h3>
                <p className="text-neutral-300 mb-8 border-b border-white/10 pb-8 min-h-[80px]">Professional pest defense for businesses that can’t afford disruption or risk.</p>
                <ul className="space-y-3 mb-8 text-sm font-medium text-neutral-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-gold" /> Audit Ready</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-gold" /> Discrete Service</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-gold" /> Zero Downtime</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 text-center bg-apex-gold text-apex-navy font-bold rounded-lg hover:bg-white transition">
                  Get Commercial Quote
                </Link>
              </div>

              {/* Preventative */}
              <div className="bg-neutral-50 dark:bg-white/5 p-8 rounded-3xl hover:shadow-xl transition-all border border-neutral-100 dark:border-white/10 group">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-apex-gold transition-colors dark:text-white">Preventative</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 border-b border-neutral-200 dark:border-white/10 pb-8 min-h-[80px]">Stop problems before they start with year-round coverage.</p>
                <ul className="space-y-3 mb-8 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Perimeter Checks</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Yard Granulation</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-apex-navy dark:text-apex-gold" /> Source Removal</li>
                </ul>
                <Link href="/pricing" className="block w-full py-3 text-center border-2 border-apex-navy dark:border-white text-apex-navy dark:text-white font-bold rounded-lg hover:bg-apex-navy hover:text-white dark:hover:bg-white dark:hover:text-apex-navy transition">
                  See Pricing
                </Link>
              </div>
            </div>
          </OneShot>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 px-6 bg-apex-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <OneShot>
            <div className="text-center mb-16">
              <span className="text-apex-gold font-bold tracking-widest uppercase text-sm">How It Works</span>
              <h2 className="text-4xl font-black mt-2">OUR PROTECTION PROCESS</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-6xl font-black text-white/10 mb-4">01</div>
                <h3 className="text-2xl font-bold text-apex-gold mb-3">Inspect & Identify</h3>
                <p className="text-neutral-400">We locate activity, entry points, and root causes. No guessing.</p>
              </div>
              <div className="p-6">
                <div className="text-6xl font-black text-white/10 mb-4">02</div>
                <h3 className="text-2xl font-bold text-apex-gold mb-3">Treat With Precision</h3>
                <p className="text-neutral-400">Targeted applications and strategic placement. Maximum impact, minimal risk.</p>
              </div>
              <div className="p-6">
                <div className="text-6xl font-black text-white/10 mb-4">03</div>
                <h3 className="text-2xl font-bold text-apex-gold mb-3">Fortify & Maintain</h3>
                <p className="text-neutral-400">Ongoing protection to reduce repeat issues and hold the line.</p>
              </div>
            </div>
          </OneShot>
        </div>
      </section>

      {/* 6. FOUNDER MINI */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-white/5 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-transparent dark:border-white/10">
          <div className="bg-neutral-200 dark:bg-neutral-800 md:w-1/3 min-h-[300px] relative">
            {/* Placeholder for Kenneth Img */}
            <div className="absolute inset-0 bg-neutral-800/10 flex items-center justify-center text-neutral-500 font-bold">Kenneth Photo</div>
          </div>
          <div className="p-10 md:w-2/3">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-apex-navy/10 dark:bg-white/10 text-apex-navy dark:text-white rounded-full text-xs font-bold uppercase">Founder</span>
              <span className="px-3 py-1 bg-apex-navy/10 dark:bg-white/10 text-apex-navy dark:text-white rounded-full text-xs font-bold uppercase">NC Native</span>
              <span className="px-3 py-1 bg-apex-navy/10 dark:bg-white/10 text-apex-navy dark:text-white rounded-full text-xs font-bold uppercase">Veteran</span>
            </div>
            <h2 className="text-3xl font-black mb-4 dark:text-white">Meet Kenneth.</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              ApexGuard was built with one goal: protect your home the right way. No rushed visits. No spray-and-go service. Just honest work, consistent protection, and solutions designed to keep pests from coming back.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 font-bold text-apex-gold hover:text-apex-navy dark:hover:text-white transition">
              Read The Full Story <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <Reviews />

      {/* 8. CLOSING CTA */}
      <section className="bg-apex-gold py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-apex-navy mb-6">READY TO SECURE YOUR PROPERTY?</h2>
          <p className="text-xl text-apex-navy/80 font-medium mb-10">
            Protect your home or business in Raleigh, Durham, Apex, Cary, and surrounding areas with a company built for long-term defense.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-apex-navy text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-apex-navy transition shadow-2xl">
              Get a Quote
            </Link>
            <Link href="/services" className="bg-white/20 border-2 border-apex-navy text-apex-navy font-bold py-4 px-10 rounded-xl hover:bg-white hover:border-white transition">
              View Services
            </Link>
          </div>
        </div>
      </section>

      <ScrollIndicator />

      {/* FLOATING ACTION BUTTON (Mobile Sticky) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link href="/contact" className="bg-apex-gold text-apex-navy font-bold p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white animate-bounce-slow">
          💬 Text Us
        </Link>
      </div>
      {/* 8. SERVICE MAP */}
      <div className="bg-neutral-900 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-apex-green/10 border border-apex-green/30 rounded-full text-apex-green text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                Live Operations
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                We Are in Your <span className="text-apex-green">Neighborhood.</span>
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-lg">
                See where our technicians are working right now. We provide rapid response pest control to Fayetteville, Hope Mills, Spring Lake, and Fort Liberty.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-2 h-2 bg-apex-green rounded-full shadow-[0_0_10px_rgba(5,213,250,0.5)]"></div>
                  Average Response Time: <span className="text-apex-green">Under 24 Hrs</span>
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-2 h-2 bg-apex-green rounded-full shadow-[0_0_10px_rgba(5,213,250,0.5)]"></div>
                  5,000+ Homes Protected
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-200 bg-apex-green rounded-lg hover:bg-apex-green/90 hover:shadow-[0_0_20px_rgba(5,213,250,0.4)]">
                Check Availability in Your Area
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Map Container */}
            <div className="h-[500px] w-full">
              <ServiceMap />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
