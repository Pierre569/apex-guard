"use client";

import OneShot from "./OneShot";
import { Star } from "lucide-react";

export default function Reviews() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            date: "2 weeks ago",
            text: "Finally a company that actually shows up when they say they will. Kenneth explained exactly where the ants were coming from and fixed it in one visit.",
            location: "Raleigh, NC"
        },
        {
            name: "Michael Ross",
            date: "1 month ago",
            text: "We had a bad wasp problem near our deck. ApexGuard handled it safely and even removed the old nests. Very professional.",
            location: "Apex, NC"
        },
        {
            name: "David Chen",
            date: "3 months ago",
            text: "I switched from a big national chain to ApexGuard and the difference is night and day. Better service, better price, and I know who is coming to my house.",
            location: "Cary, NC"
        }
    ];

    return (
        <section className="py-24 bg-neutral-50 dark:bg-transparent border-y border-neutral-200 dark:border-white/5 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <OneShot>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="flex text-apex-gold">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </span>
                            <span className="font-bold text-apex-navy dark:text-white">5.0 Star Rating</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-apex-navy dark:text-white mb-6">TRUSTED BY LOCALS.</h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            We don't buy leads. We build relationships through results. See what your neighbors are saying.
                        </p>
                    </OneShot>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <OneShot key={i} delay={i * 0.1}>
                            <div className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-sm border border-neutral-100 dark:border-white/10 h-full flex flex-col relative">
                                {/* Google Logo Placeholder/Icon */}
                                <div className="absolute top-8 right-8 text-neutral-200 dark:text-neutral-600">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                    </svg>
                                </div>

                                <div className="flex gap-1 text-apex-gold mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>

                                <p className="text-neutral-700 dark:text-neutral-300 mb-6 italic flex-grow">"{review.text}"</p>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-neutral-100 dark:border-white/10">
                                    <div className="w-10 h-10 bg-apex-navy/10 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-apex-navy dark:text-white">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-apex-navy dark:text-white text-sm">{review.name}</div>
                                        <div className="text-neutral-400 text-xs">{review.location} • {review.date}</div>
                                    </div>
                                </div>
                            </div>
                        </OneShot>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-apex-navy font-bold transition"
                    >
                        Read more reviews on Google <span className="text-xl">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
