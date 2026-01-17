import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { SectionHeader } from '../ui/section-header';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const blogs = [
    {
        title: 'Decoding the Trusted: Why TEEs Are Still Viable for Secure Computing',
        date: 'Dec 12, 2023',
        author: 'Pankaj Sissodia',
        href: '#',
    },
    {
        title: 'Modelling the Adversarial: When TEEs Are Still Viable for Secure Computing',
        date: 'Dec 08, 2023',
        author: 'Tanmay Goel',
        href: '#',
    },
    {
        title: 'Extending the Trust Wall: Why TEEs Are Still Viable for Secure Computing',
        date: 'Nov 24, 2023',
        author: 'Nishitayush Gupta',
        href: '#',
    },
];

export function ReveriesSection() {
    return (
        <GridBackground className="py-16 bg-background border-b border-border" withNoise={true}>
            <div className="max-w-[1300px] mx-auto">
                {/* Architectural Header */}
                <div className="h-20 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 mb-12">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-8 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-0 sm:min-w-[300px]">
                            <span className="font-mono text-xs sm:text-xl font-bold uppercase tracking-[0.4em] whitespace-nowrap">Reveries</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full bg-black/95 dark:bg-black/60 relative overflow-hidden">
                        <div className="absolute inset-0 grid-lines opacity-20 bg-zinc-900"></div>
                    </div>
                    <div className="w-12 sm:w-16 h-full border-r border-border bg-background"></div>
                </div>

                <div className="space-y-0">
                    {blogs.map((blog, index) => (
                        <Link
                            key={index}
                            href={blog.href}
                            className="group flex flex-col sm:flex-row items-start sm:items-center py-8 border-b border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors relative"
                        >
                            {/* Thumbnail Placeholder */}
                            <div className="w-full sm:w-48 h-32 bg-zinc-200 dark:bg-zinc-800 border border-border mb-4 sm:mb-0 sm:mr-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                <div className="w-full h-full grid-lines opacity-20" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-instrumental text-xl sm:text-2xl mb-2 group-hover:underline underline-offset-4 decoration-1">
                                    {blog.title}
                                </h3>
                                <div className="flex items-center space-x-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                                    <span>{blog.date}</span>
                                    <span>/</span>
                                    <span>By {blog.author}</span>
                                </div>
                            </div>

                            <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:relative sm:translate-y-0 ml-4">
                                <ArrowUpRight className="w-6 h-6 text-foreground/30 group-hover:text-foreground transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 flex justify-end">
                    <Link
                        href="/blogs"
                        className="font-mono text-xs uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1"
                    >
                        Discover Blogs
                    </Link>
                </div>
            </div>
        </GridBackground>
    );
}
