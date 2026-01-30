"use client";

import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export function MissionSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const stripImage = mounted
        ? (isDark ? '/dark-mode/dark-strip.png' : '/light-mode/light-strip.png')
        : null;

    return (
        <GridBackground className="bg-background border-b mt-18 z-2 border-border max-w-[1400px] mx-auto" withNoise={false}>
            {/* Segment Divider for Mission - Architectural Slices */}
            <div className="h-16 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 px-0">
                <div className="flex h-full items-center">
                    <div className="h-full border-r border-border px-8 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-[200px] sm:min-w-[300px]">
                        <span className="font-mono font-semibold text-xl sm:text-2xl uppercase whitespace-nowrap">Our Mission</span>
                    </div>
                </div>
                {/* Dark area to the right of Our Mission */}
                <div className="flex-1 h-full relative overflow-hidden">
                    {mounted && stripImage && (
                        <Image
                            src={stripImage}
                            alt="Decorative strip"
                            fill
                            className="object-cover opacity-50 contrast-125"
                        />
                    )}
                </div>
            </div>

            <div className="px-4 sm:px-12 md:px-12 py-14">
                <div className="max-w-6xl pb-4">
                    <p className="font-mono text-sm sm:text-2xl text-foreground/80 leading-relaxed">
                        At Bluethroat Labs, our mission is to accelerate the security maturity of
                        Trusted Execution Environments (TEEs) in Web3. The smart contract ecosystem only
                        became meaningfully safer once vulnerable patterns and hard-earned lessons were
                        openly documented and best practices were widely internalized. Before that,
                        security knowledge stayed trapped in isolated &quot;security islands,&quot; slowing
                        progress while attackers only needed to be right once.
                    </p>
                </div>
            </div>
        </GridBackground>
    );
}
