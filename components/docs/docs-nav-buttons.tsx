'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavButtonProps {
    prev?: { title: string; href: string };
    next?: { title: string; href: string };
}

export function DocsNavButtons({ prev, next }: NavButtonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mt-16 mb-12">
            {prev ? (
                <Link
                    href={prev.href}
                    className="group bg-background p-8 hover:bg-muted transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors font-mono text-sm">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold uppercase tracking-wider">Previous</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted-foreground px-2 py-1 border border-border bg-muted">
                            <span className="opacity-70">Cmd</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold group-hover:text-foreground transition-colors leading-tight">
                        {prev.title}
                    </div>
                </Link>
            ) : <div className="bg-background" />}

            {next ? (
                <Link
                    href={next.href}
                    className="group bg-background p-8 hover:bg-muted transition-all duration-300 border-l border-border md:border-l-0"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted-foreground px-2 py-1 border border-border bg-muted">
                            <span className="opacity-70">Cmd</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors font-mono text-sm">
                            <span className="font-semibold uppercase tracking-wider">Next</span>
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold group-hover:text-foreground transition-colors text-right leading-tight">
                        {next.title}
                    </div>
                </Link>
            ) : <div className="bg-background" />}
        </div>
    );
}
