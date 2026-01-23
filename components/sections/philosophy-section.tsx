"use client";

import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { CornerUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';

export function PhilosophySection() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const bgImage = isDark ? '/dark-mode/dark-mission-2.png' : '/light-mode/light-mission-2.png';

    return (
        <GridBackground
            className="py-32 bg-background border-b border-border"
            backgroundImage={bgImage}
        >
            {/* 1. Removed 'mx-auto' and added 'ml-0' to pin to the left */}
            <div className="max-w-4xl px-6 sm:px-12 md:px-24 ml-0">
                <div className="space-y-12">
                    <div className='mt-48'>
                        <p className="font-instrumental max-w-xl text-2xl sm:text-3xl md:text-3xl leading-relaxed mb-6 drop-shadow-sm text-foreground">
                            As TEEs move deeper into Web3, clarity becomes critical.
                            Assumptions about hardware trust do not survive adversarial settings.
                        </p>

                        <p className="font-instrumental max-w-2xl text-foreground leading-relaxed text-3xl drop-shadow-sm">
                            The <span className="italic text-foreground/50 underline-offset-4">TEE Security Handbook<CornerUpRight className="inline-block ml-2 stroke-1" /></span> exists to document real
                            guarantees, real failure modes, and practical integration patterns.
                        </p>
                    </div>
                </div>
            </div>
        </GridBackground>
    );
}