"use client";

import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { CornerUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export function PhilosophySection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const bgImage = mounted
        ? (isDark ? '/dark-mode/dark-mission-2.png' : '/light-mode/light-mission-2.png')
        : undefined;

    return (
        <GridBackground
            className="relative py-32 bg-background border-b border-border overflow-hidden"
            backgroundImage={bgImage}
            overlay={
                <div
                    className="absolute right-0 top-0 bottom-0 w-2 bg-primary/30"
                    aria-hidden="true"
                />
            }
        >
            <span className="font-mono flex text-base sm:text-base text-foreground/30 mt-2 mr-4 uppercase items-end whitespace-nowrap absolute top-[-320px] right-0">2/2</span>

            {/* Content Container */}
            <div className="max-w-4xl px-6 sm:px-12 md:px-24 ml-0">
                <div className="space-y-12">
                    <div className='mt-48'>
                        <p className="font-instrumental max-w-xl text-2xl sm:text-3xl md:text-3xl leading-relaxed mb-6 drop-shadow-sm text-foreground">
                            As TEEs move deeper into Web3, clarity becomes critical.
                            Assumptions about hardware trust do not survive adversarial settings.
                        </p>

                        <p className="font-instrumental max-w-2xl text-foreground leading-relaxed text-3xl drop-shadow-sm">
                            The <Link href="/docs" className="italic text-foreground/50 underline-offset-4 hover:text-foreground transition-colors">TEE Security Handbook<CornerUpRight className="inline-block ml-2 stroke-1" /></Link> exists to document real
                            guarantees, real failure modes, and practical integration patterns.
                        </p>
                    </div>
                </div>
            </div>
        </GridBackground>
    );
}