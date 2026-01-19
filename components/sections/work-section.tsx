import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BookIcon = () => (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
        <rect x="5" y="5" width="70" height="90" rx="4" stroke="black" strokeWidth="1.5" />
        <path d="M5 80C5 80 20 75 40 75C60 75 75 80 75 80" stroke="black" strokeWidth="1.5" />
        <rect x="15" y="15" width="50" height="50" rx="25" stroke="black" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M40 25V55M25 40H55" stroke="black" strokeWidth="1.5" opacity="0.4" />
        <path d="M15 10H65M15 15H65M15 20H65M15 25H65" stroke="black" strokeWidth="0.5" opacity="0.3" />
        <path d="M15 75V95M65 75V95" stroke="black" strokeWidth="1.5" />
    </svg>
);

const BugIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
        <path d="M10 20V10H20M60 10H70V20M70 60V70H60M20 70H10V60" stroke="black" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="15" stroke="black" strokeWidth="1.5" />
        <path d="M40 25V15M40 65V55M25 40H15M65 40H55" stroke="black" strokeWidth="1.5" />
        <path d="M30 30L22 22M50 30L58 22M30 50L22 58M50 50L58 58" stroke="black" strokeWidth="1.5" />
        <rect x="35" y="32" width="10" height="16" fill="black" opacity="0.1" />
        <path d="M25 25V55M30 25V55M35 25V55M40 25V55M45 25V55M50 25V55M55 25V55" stroke="black" strokeWidth="0.5" opacity="0.3" />
    </svg>
);

const TeeIcon = () => (
    <div className="relative inline-block">
        <div className="text-7xl font-bold tracking-tighter text-black flex relative">
            <span className="relative z-10">TEE</span>
            <div className="absolute inset-0 flex overflow-hidden pointer-events-none opacity-40">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-px bg-black h-full shrink-0" style={{ marginLeft: '2px' }} />
                ))}
            </div>
        </div>
        <div className="absolute -top-4 -right-2 flex items-end gap-0.5 opacity-80 scale-125">
            <div className="w-0.5 h-1.5 bg-black" />
            <div className="w-0.5 h-3 bg-black" />
            <div className="w-px h-1 bg-black" />
            <div className="w-0.5 h-4 bg-black" />
            <div className="w-px h-2 bg-black" />
        </div>
    </div>
);

export function WorkSection() {
    return (
        <section className="bg-background text-[#1a1a1a] font-mono border-gray-200">
            {/* Header Row */}
            <div className="flex border-b border-border">
                <div className="w-1/5 sm:w-1/5 flex items-center px-8 sm:px-8 py-4 border-r border-border bg-background">
                    <h2 className="text-xl sm:text-2xl text-foreground font-semibold tracking-normal">OUR WORK</h2>
                </div>
                <div className="flex-1 relative overflow-hidden bg-background">
                    <Image
                        src="/woodcut-pattern.png"
                        alt="Woodcut Pattern"
                        fill
                        className="object-cover opacity-80 mix-blend-multiply"
                    />
                </div>
            </div>

            {/* Intro Text Row */}
            <div className="px-8 sm:px-16 py-6 sm:py-8 border-b border-border bg-background">
                <p className="max-w-6xl text-base sm:text-lg leading-relaxed font-medium text-foreground">
                    We do three kinds of work. One is public, to raise the baseline for the entire ecosystem. The others are
                    private, where we help teams find and fix real issues before attackers do.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-background">
                {/* Column 1: The TEE Security Handbook */}
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-border">
                    <div className="p-10 sm:p-14 flex-1">
                        <div className="mb-14 h-32 flex items-center">
                            <BookIcon />
                        </div>
                        <h3 className="text-xl sm:text-2xl text-foreground font-semibold mb-4">
                            The TEE Security<br />Handbook
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/70">
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
                    <div className="p-10 sm:p-14 flex-1">
                        <div className="mb-14 h-32 flex items-center">
                            <BugIcon />
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
                    <div className="p-10 sm:p-14 flex-1">
                        <div className="mb-14 h-32 flex items-center">
                            <TeeIcon />
                        </div>
                        <h3 className="text-xl sm:text-2xl text-foreground font-semibold mb-4">
                            TEE Vulnerability<br />Reasoning LLM
                        </h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/70">
                            We are building a specialized LLM agent designed to reason about vulnerabilities in Web3 protocols that leverage TEEs in different roles and architectures. The goal is to accelerate threat modeling, surface risky assumptions early, and help teams converge on safer designs faster.
                        </p>
                    </div>
                    <div className="h-18 flex items-center justify-center bg-background text-foreground/40 border-t border-border text-xl font-semibold">
                        Coming Soon...
                    </div>
                </div>
            </div>
            <div className="h-16 border-t border-border bg-background" />
        </section>
    );
}
