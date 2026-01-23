import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function HeroSection() {
    return (
        <GridBackground
            id="hero"
            /* 1. Changed min-h-screen to h-fit or a fixed height like h-[600px] sm:h-[800px] */
            className="h-fit flex flex-colmax-w-[1400px] mx-auto overflow-visible select-none"
            backgroundImage="/light-mode/light-hero.png"
            withCross={true}
        >
            {/* 2. Removed bottom padding (changed py to pt) so the container ends at the bottom box */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-20 sm:pt-42 pb-0 relative">

                {/* Main Heading Text */}
                <div className="relative z-20 -translate-x-14 -translate-y-14 flex flex-col items-center text-center sm:text-left gap-12 mb-32 sm:mb-48">
                    <h1 className="font-instrumental text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[120px] font-normal leading-[0.85] text-white mix-blend-difference tracking-tight">
                        Assumptions
                    </h1>
                    <h1 className="font-instrumental text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[120px] font-normal leading-[0.85] text-white mix-blend-difference sm:ml-[25%] md:ml-[29%] tracking-tight mt-2 sm:mt-0">
                        Kill Systems
                    </h1>
                </div>

                {/* Description Box Overlay */}
                {/* Note: I removed 'absolute' and used 'relative' if you want it to push the container height naturally, 
                    OR kept it absolute but ensured the parent has no extra bottom padding. */}
                <div className="absolute bottom-0 left-0 bg-[#191919] p-6 sm:p-8 md:p-12 max-w-[1200px] mx-auto w-full sm:max-w-4xl z-30">
                    <p className="font-mono font-semibold text-xs sm:text- md:text-base text-zinc-100 leading-relaxed tracking-widest opacity-90">
                        Bluethroat Labs is a security research collective focused on making
                        TEE-heavy Web3 protocols actually secure, robust, and reliable.
                    </p>
                </div>
            </div>
        </GridBackground>
    );
}
