'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavButtonProps {
    prev?: { title: string; href: string };
    next?: { title: string; href: string };
}

export function DocsNavButtons({ prev, next }: NavButtonProps) {
    if (!prev && !next) return null;

    // This constant holds the font variable class name
    const baiFont = "var(--font-bai-jamjuree)";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-12">

            {/* Previous Button */}
            {prev ? (
                <Link
                    href={prev.href}
                    className="group bg-background p-5 border border-border hover:border-foreground transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div
                            className="flex items-center gap-2 text-muted-foreground transition-colors text-xs"
                            style={{ fontFamily: baiFont }} // Applying Bai Jamjuree
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-semibold text-base">Previous</span>
                        </div>
                        <div className="hidden sm:flex gap-1 items-center text-[10px] font-mono font-bold text-muted-foreground px-1.5 py-0.5">
                            <span className="text-xs bg-muted p-1">Cmd</span>
                            <span><ArrowLeft className="w-6 h-6 bg-muted stroke-2 p-1" /></span>
                        </div>
                    </div>
                    <div
                        className="text-lg font-semibold group-hover:text-foreground transition-colors leading-tight"
                    >
                        {prev.title}
                    </div>
                </Link>
            ) : (
                <div className="hidden md:block" />
            )}

            {/* Next Button */}
            {next ? (
                <Link
                    href={next.href}
                    className="group bg-background p-5 border border-border hover:border-foreground transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold text-muted-foreground px-1.5 py-0.5">
                            <span className="bg-muted p-1 text-xs">Cmd</span>
                            <span><ArrowRight className="w-6 h-6 bg-muted stroke-2 p-1" /></span>
                        </div>
                        <div
                            className="flex items-center gap-2 text-muted-foreground transition-colors text-xs"
                            style={{ fontFamily: baiFont }}
                        >
                            <span className="font-semibold text-base">Next</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                    <div
                        className="text-lg font-semibold group-hover:text-foreground transition-colors text-right leading-tight"
                    >
                        {next.title}
                    </div>
                </Link>
            ) : (
                <div className="hidden md:block" />
            )}
        </div>
    );
}