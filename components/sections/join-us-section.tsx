'use client';

import React from 'react';
import { Mail } from 'lucide-react';

export function JoinUsSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 border-b border-border select-none">
            <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: 'url(/dark-mode/dark-footer.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) brightness(1)'
                }}
            />

            {/* Center Card */}
            <div className="relative z-10 w-full max-w-4xl mx-6 bg-background border border-border shadow-[0_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="p-8 sm:py-10 md:py-10 text-center">
                    <span className="font-mono text-xl uppercase text-foreground mb-6 block font-bold">
                        JOIN US
                    </span>

                    <h2 className="font-instrumental text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] mb-6 text-zinc-900 dark:text-zinc-100">
                        We&apos;re always looking for people who take security seriously and enjoy going deep.
                    </h2>
                    <p className="font-mono text-xs sm:text-sm md:text-base text-zinc-500 font-medium leading-[1.8] max-w-3xl mx-auto">
                        If you have real experience with TEEs, in Web3 or outside it, or you&apos;re the kind of person who likes tinkering, breaking systems, and learning new security paradigms, we&apos;d love to hear from you.
                    </p>
                </div>

                {/* CTA Button/Bar */}
                <a
                    href="mailto:hello@bluethroat.ai"
                    className="flex items-center justify-center gap-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 py-5 px-10 transition-all hover:bg-black dark:hover:bg-white group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                    <Mail className="w-8 h-8 group-hover:scale-110 transition-transform relative z-10" />
                    <span className="font-mono font-semibold text-sm sm:text-lg relative z-10">
                        Send us a short intro
                    </span>
                </a>
            </div>
        </section>
    );
}
