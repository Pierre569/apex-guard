import { getPostData, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Bug, MapPin, Shield, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostData(params.slug);

    if (!post) {
        notFound();
    }

    const isWiki = post.type === 'wiki';
    const isCaseStudy = post.type === 'case-study';
    const isFAQ = post.type === 'faq';

    return (
        <article className="min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-800 dark:text-slate-200 pb-20">
            {/* Hero Section */}
            <div className="relative bg-apex-navy text-white py-32 px-6 text-center">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center text-apex-gold hover:underline mb-8 font-bold tracking-wide">
                        <ArrowLeft size={16} className="mr-2" /> Back to Intelligence
                    </Link>
                </div>

                <article className="max-w-4xl mx-auto p-6 md:p-12 bg-white dark:bg-zinc-900 my-8 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10">

                    {/* Header Section */}
                    <header className="mb-10 text-center">
                        {isWiki && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase mb-4">
                                <Bug size={14} /> Pest ID Wiki
                            </div>
                        )}
                        {isCaseStudy && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase mb-4">
                                <MapPin size={14} /> Neighborhood Report
                            </div>
                        )}
                        {isFAQ && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-4">
                                <Shield size={14} /> Expert Answers
                            </div>
                        )}

                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
                            {post.title}
                        </h1>

                        {/* Meta Data Grid */}
                        <div className="flex justify-center gap-6 text-sm font-mono opacity-60">
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            {post.scientific_name && <span>• {post.scientific_name}</span>}
                            {post.neighborhood && <span>• {post.neighborhood}</span>}
                        </div>
                    </header>

                    {/* Special Wiki Stats Box */}
                    {isWiki && post.danger_level && (
                        <div className="mb-10 p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-700 dark:text-red-400 uppercase text-xs mb-1">Danger Level</h3>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{post.danger_level}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert mx-auto prose-h2:text-apex-navy dark:prose-h2:text-white prose-a:text-apex-gold prose-img:rounded-xl">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Dynamic Footer CTA */}
                    <div className="mt-16 pt-10 border-t border-slate-100 dark:border-white/10 text-center">
                        {isWiki ? (
                            <>
                                <h3 className="text-2xl font-bold mb-2">Spotted a {post.title.split(' ')[0]}?</h3>
                                <p className="mb-6 opacity-70">Don't let them multiply. We specialize in {post.slug} removal.</p>
                                <Link href="/contact" className="inline-block bg-red-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition">
                                    Confirm ID & Treat
                                </Link>
                            </>
                        ) : isCaseStudy ? (
                            <>
                                <h3 className="text-2xl font-bold mb-2">Live in {post.neighborhood}?</h3>
                                <p className="mb-6 opacity-70">Your neighbors trusted us to protect their home.</p>
                                <Link href="/contact" className="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition">
                                    Get a Quote for {post.neighborhood}
                                </Link>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold mb-2">Have more questions?</h3>
                                <Link href="/contact" className="inline-block bg-apex-navy text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition">
                                    Ask an Expert
                                </Link>
                            </>
                        )}
                    </div>
                </article>
            </div>
            );
}
