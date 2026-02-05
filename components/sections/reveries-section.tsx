"use client";

import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { REVERIES } from '@/lib/reveries-data';

export function ReveriesSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const stripImage = mounted
        ? (isDark ? '/dark-mode/dark-strip.png' : '/light-mode/light-strip.png')
        : null;

    // Use dynamic data and format it
    const displayBlogs = REVERIES.slice(0, 3).map(post => ({
        title: post.title,
        date: post.blocks.find(b => b.type === 'tag')?.metadata?.date || 'Coming soon',
        category: post.blocks.find(b => b.type === 'tag')?.metadata?.category || 'General',
        href: `/reveries/${post.slug}`,
        src: post.bannerImage
    }));

    return (
        <GridBackground id="reveries" className="py-16 bg-background border-b border-t border-border" withNoise={true}>
            <div className="max-w-[1300px] border-b border-border mx-auto">

                {/* Architectural Header */}
                <div className="h-16 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 mb-0">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-[240px]">
                            <span className="font-mono font-semibold text-2xl uppercase">Reveries</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full relative overflow-hidden">
                        {mounted && stripImage && (
                            <Image
                                src={stripImage}
                                alt="Decorative strip"
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>

                <div className="mt-12 border-border border-t">
                    {displayBlogs.map((blog, index) => (
                        <Link
                            key={index}
                            href={blog.href}
                            className="group flex items-stretch border-b border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                        >
                            {/* Content Side */}
                            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-12">
                                {/* Thumbnail */}
                                <div className="w-full sm:w-40 h-24 bg-zinc-200 dark:bg-zinc-800 border border-border mb-4 sm:mb-0 sm:mr-8 overflow-hidden shrink-0 relative">
                                    {blog.src ? (
                                        <Image
                                            src={blog.src}
                                            alt={blog.title}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-300 dark:bg-zinc-700 opacity-20" />
                                    )}
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
                                    <ArrowUpRight className='w-16 h-16 stroke-[1.4px] text-foreground transition-transform' />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-end items-center">
                    <div className='group flex justify-end border-l p-5 px-24 border-border hover:bg-foreground transition-colors'>
                        <Link
                            href="/reveries"
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