import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function HeroSection() {
    return (
        <GridBackground
            className="min-h-screen flex flex-col bg-zinc-900 border-x border-border max-w-[1400px] mx-auto overflow-visible select-none"
            backgroundImage="/hero-bg.png"
            withCross={true}
        >
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-20 sm:py-32 relative">
                {/* Main Heading Text - Responsive scaling */}
                <div className="relative z-20 flex mx-8 sm:px-12 md:px-24 flex-col items-center sm:items-start text-center sm:text-left">
                    <h1 className="font-playfair text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-6xl xl:text-[10rem] font-normal leading-[0.8] text-white mix-blend-difference tracking-tight">
                        Assumptions
                    </h1>
                    <h1 className="font-playfair text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-6xl xl:text-[10rem] font-normal leading-[0.8] text-white mix-blend-difference sm:ml-[25%] md:ml-[28%] tracking-tight mt-2 sm:mt-0">
                        Kill Systems
                    </h1>
                </div>

                {/* Description Box Overlay - Full width on mobile, boxed on desktop */}
                <div className="absolute bottom-0 left-0 bg-black border-r border-t border-border p-8 sm:p-12 md:p-16 w-full sm:max-w-2xl z-30">
                    <p className="font-mono text-xs sm:text-sm md:text-base text-zinc-100 leading-relaxed uppercase tracking-widest opacity-90">
                        Bluethroat Labs is a security research collective focused on making
                        TEE-heavy Web3 protocols actually secure, robust, and reliable.
                    </p>
                </div>
            </div>

            {/* Architectural Gap above Mission Bar */}
            <div className="h-8 bg-zinc-50 dark:bg-black border-t border-border"></div>

            {/* Segment Divider for Mission - Architectural Slices */}
            <div className="h-20 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 px-0">
                <div className="flex h-full items-center">
                    <div className="h-full border-r border-border px-8 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-0 sm:min-w-[300px]">
                        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.4em] whitespace-nowrap">Our Mission</span>
                    </div>
                </div>
                {/* Dark area to the right of Our Mission */}
                <div className="flex-1 h-full bg-black/95 dark:bg-black/60 relative overflow-hidden">
                    <div className="absolute inset-0 grid-lines opacity-20 bg-zinc-900"></div>
                </div>
                {/* Structural gap on far right */}
                <div className="w-12 sm:w-16 h-full border-r border-border bg-background"></div>
            </div>
        </GridBackground>
    );
}
