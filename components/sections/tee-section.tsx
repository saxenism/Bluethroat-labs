"use client";

import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export function TeeSection() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const bgImage = isDark ? '/dark-mode/dark-mission-1.png' : '/light-mode/light-mission-1.png';

    return (
        <GridBackground
            className="py-60 bg-background border-t border-b border-border"
            backgroundImage={bgImage}
        >
            {/* The 'text-right' here ensures all inline content leans right */}
            <div className="max-w-7xl mx-auto px-12 sm:px-24 text-right">

                {/* Use 'flex flex-col items-end' as a backup to force children to the right */}
                <div className="flex flex-col items-end">

                    <div className="w-full">
                        {/* Added 'ml-auto' to move the box to the right */}
                        <p className="font-mono max-w-3xl ml-auto font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 text-right drop-shadow-sm text-foreground">
                            Trusted Execution Environments are a proven security primitive. They have been used for years in phones, payments, and other security-critical systems.
                        </p>

                        {/* Added 'ml-auto' to move the box to the right */}
                        <p className="font-mono max-w-4xl ml-auto font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 text-right drop-shadow-sm text-foreground">
                            In Web3, TEEs are held to a different bar. Hardware trust sits uneasily with decentralisation and transparency.
                        </p>
                    </div>

                    {/* Added 'ml-auto' and 'text-right' to the quote section */}
                    <div className="w-full text-right">
                        <div>
                            <p className="font-instrumental text-xl sm:text-3xl leading-relaxed drop-shadow-sm text-foreground">
                                That tension cannot be ignored. <br />
                                If it is not modelled honestly, it fails in production.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </GridBackground>
    );
}