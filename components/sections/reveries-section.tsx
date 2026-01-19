import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const blogs = [
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Modelling the Adversarial: When TEEs Are Still Viable for Secure Computing',
        date: 'December 08, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Extending the Trust Wall: Why TEEs Are Still Viable for Secure Computing',
        date: 'November 24, 2023',
        category: 'TEE Security',
        href: '#',
    },
];

export function ReveriesSection() {
    return (
        <GridBackground className="py-16 bg-background border-b border-t border-border" withNoise={true}>
            <div className="max-w-[1300px] border-b border-border mx-auto">

                {/* Architectural Header */}
                <div className="h-16 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 mb-0">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-8 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-[200px]">
                            <span className="font-mono font-bold text-xl uppercase tracking-tighter">Reveries</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full bg-black/95 dark:bg-zinc-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                    </div>
                </div>

                <div className="mt-12 border-border border-t">
                    {blogs.map((blog, index) => (
                        <Link
                            key={index}
                            href={blog.href}
                            className="group flex items-stretch border-b border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                        >
                            {/* Content Side */}
                            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-12">
                                {/* Thumbnail */}
                                <div className="w-full sm:w-40 h-24 bg-zinc-200 dark:bg-zinc-800 border border-border mb-4 sm:mb-0 sm:mr-8 overflow-hidden shrink-0">
                                    <div className="w-full h-full grid-lines opacity-20 bg-zinc-400 dark:bg-zinc-600" />
                                </div>

                                {/* Text content */}
                                <div className="flex-1 align-text-top">
                                    <h3 className="font-mono text-base sm:text-xl font-semibold leading-snug mb-3 max-w-4xl">
                                        {blog.title}
                                    </h3>
                                    <div className="flex items-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                                        <span>{blog.category}</span>
                                        <span className="mx-2 text-border text-lg">•</span>
                                        <span>{blog.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* The "Boxed" Arrow Side */}
                            <div className="flex items-start justify-end transition-colors">
                                <div className=' border-l border-b border-border'>
                                    <ArrowUpRight className='w-20 h-20 p-2 stroke-[1.5px] text-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-end items-center">
                    <div className='group flex justify-end border-l p-5 px-24 border-border hover:bg-foreground transition-colors'>
                        <Link
                            href="/blogs"
                            className="font-mono flex justify-center text-xl font-semibold text-foreground group-hover:text-secondary items-center transition-colors"
                        >
                            Checkout Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </GridBackground>
    );
}