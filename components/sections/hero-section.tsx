import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function HeroSection() {
    return (
        <GridBackground
            className="min-h-screen flex flex-col bg-zinc-900 border-x border-border max-w-[1400px] mx-auto overflow-visible select-none"
            backgroundImage="/hero-bg.png"
            withCross={true}
        >
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-20 sm:py-42 relative">
                {/* Main Heading Text - Responsive scaling */}
                <div className="relative z-20 -translate-x-14 -translate-y-14 flex flex-col items-center text-center sm:text-left gap-12">
                    <h1 className="font-instrumental text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[120px] font-normal leading-[0.85] text-white mix-blend-difference tracking-tight">
                        Assumptions
                    </h1>
                    <h1 className="font-instrumental text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[120px] font-normal leading-[0.85] text-white mix-blend-difference sm:ml-[25%] md:ml-[29%] tracking-tight mt-2 sm:mt-0">
                        Kill Systems
                    </h1>
                </div>

                {/* Description Box Overlay - Full width on mobile, boxed on desktop */}
                <div className="absolute bottom-0 left-0 bg-[#191919] p-6 sm:p-8 md:p-12 max-w-[1200px] mx-auto w-full sm:max-w-4xl z-30">
                    <p className="font-mono font-semibold text-xs sm:text- md:text-base text-zinc-100 leading-relaxed tracking-widest opacity-90">
                        Bluethroat Labs is a security research collective focused on making
                        TEE-heavy Web3 protocols actually secure, robust, and reliable.
                    </p>
                </div>
            </div>

            {/* Architectural Gap above Mission Bar */}
            <div className="h-18 bg-zinc-50 dark:bg-black border-t border-border"></div>

            {/* Segment Divider for Mission - Architectural Slices */}
            <div className="h-16 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 px-0">
                <div className="flex h-full items-center">
                    <div className="h-full border-r border-border px-8 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-[200px] sm:min-w-[300px]">
                        <span className="font-mono font-semibold text-xl sm:text-2xl uppercase whitespace-nowrap">Our Mission</span>
                    </div>
                </div>
                {/* Dark area to the right of Our Mission */}
                <div className="flex-1 h-full bg-black/95 dark:bg-black/60 relative overflow-hidden">
                    <div className="absolute inset-0 grid-lines opacity-20 bg-zinc-900"></div>
                </div>
            </div>
        </GridBackground>
    );
}
