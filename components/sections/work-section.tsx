"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function WorkSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const stripImage = mounted
        ? (isDark ? '/dark-mode/dark-strip.png' : '/light-mode/light-strip.png')
        : null;

    const icons = mounted && isDark
        ? ['/dark-mode/dark-icon-1.png', '/dark-mode/dark-icon-2.png', '/dark-mode/dark-icon-3.png']
        : ['/light-mode/light-Icon-1.png', '/light-mode/light-Icon-2.png', '/light-mode/light-Icon-3.png'];

    return (
        <section className="bg-background mt-17 border-t border-border text-foreground font-mono">
            {/* Header Row */}
            <div className="flex border-b border-border">
                <div className="flex h-full items-center">
                    <div className="h-full border-r border-border px-6 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-[170px] sm:min-w-[250px] py-4">
                        <span className="font-mono font-semibold text-xl sm:text-2xl uppercase whitespace-nowrap">Our Work</span>
                    </div>
                </div>
                <div className="flex-1 relative overflow-hidden bg-background">
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

            {/* Intro Text Row */}
            <div className="px-6 sm:px-12 py-5 sm:py-8 border-b border-border bg-background">
                <p className="max-w-6xl text-base sm:text-lg font-medium text-foreground dark:group-hover:text-white transition-colors pb-4">
                    We do three kinds of work. One is public, to raise the baseline for the entire ecosystem. The others are
                    private, where we help teams find and fix real issues before attackers do.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-background">
                {/* Column 1: The TEE Security Handbook */}
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-border">
                    <div className="px-10 pt-4 sm:px-14 sm:pt-12 flex-1">
                        <div className="mb-6 h-28 flex items-center">
                            {mounted && (
                                <div className="relative w-25 h-25">
                                    <Image src={icons[0]} alt="Icon 1" fill className="object-contain" />
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl sm:text-2xl text-foreground font-semibold mb-4">
                            The TEE Security<br />Handbook
                        </h3>
                        <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-foreground/60">
                            Our open-source public good. A living handbook that documents TEE failure modes, vulnerable patterns, and practical guidance for safely designing and deploying TEE-heavy Web3 systems.
                        </p>
                    </div>
                    <Link
                        href="/handbook"
                        className="h-18 flex items-center justify-center text-foreground bg-background hover:bg-foreground hover:text-background transition-colors border-t border-border text-xl font-semibold"
                    >
                        Check out the Handbook
                    </Link>
                </div>

                {/* Column 2: Confidential Bug Bounty Work */}
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-border">
                    <div className="px-10 pt-4 sm:px-14 sm:pt-12 flex-1">
                        <div className="mb-6 h-28 flex items-center">
                            {mounted && (
                                <div className="relative w-25 h-25">
                                    <Image src={icons[1]} alt="Icon 2" fill className="object-contain" />
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl sm:text-2xl text-foreground font-semibold mb-4">
                            Confidential Bug<br />Bounty Work
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/70">
                            We do ongoing, private vulnerability research across TEE-backed protocols. Details stay confidential by default, but the security lessons and patterns eventually flow back into the ecosystem through the Handbook.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="h-18 flex items-center justify-center text-foreground bg-background hover:bg-foreground hover:text-background transition-colors border-t border-border text-xl font-semibold"
                    >
                        Talk to Us
                    </Link>
                </div>

                {/* Column 3: TEE Vulnerability Reasoning LLM */}
                <div className="flex flex-col">
                    <div className="px-10 pt-4 pb-12 sm:px-14 sm:pt-12 flex-1">
                        <div className="mb-6 h-28 flex items-center">
                            {mounted && (
                                <div className="relative w-45 h-45">
                                    <Image src={icons[2]} alt="Icon 3" fill className="object-contain" />
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl sm:text-2xl text-foreground font-semibold mb-4">
                            TEE Vulnerability<br />Reasoning LLM
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/70">
                            We are building a specialized LLM agent designed to reason about vulnerabilities in Web3 protocols that leverage TEEs in different roles and architectures. The goal is to accelerate threat modeling, surface risky assumptions early, and help teams converge on safer designs faster.
                        </p>
                    </div>
                    <div className="h-18 flex items-center justify-center bg-background text-foreground border-t border-border text-xl font-semibold">
                        Coming Soon...
                    </div>
                </div>
            </div>
            <div className="h-16 border-t border-border bg-background" />
        </section>
    );
}
