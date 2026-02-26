'use client'

import { useState, useEffect } from 'react'
import { GridBackground } from '../ui/grid-background'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const bgImage = mounted
    ? isDark
      ? '/dark-mode/dark-hero.png'
      : '/dark-mode/dark-hero.png'
    : undefined

  return (
    <GridBackground
      id="hero"
      /* Force the background to be dark even in light mode for this section */
      className="mx-auto flex h-fit max-w-[1400px] flex-col bg-[#191919] select-none"
      backgroundImage={bgImage}
      withCross={true}
    >
      {/* 2. Removed bottom padding (changed py to pt) so the container ends at the bottom box */}
      <div className="relative flex flex-1 flex-col justify-center px-6 pt-20 pb-0 sm:px-12 sm:pt-42 md:px-24">
        {/* Main Heading Text */}
        <div className="relative z-20 mb-32 flex -translate-x-14 -translate-y-4 flex-col items-center gap-5 py-12 text-center sm:mb-48 sm:text-left md:-translate-x-14 md:-translate-y-14 md:gap-11 md:py-0">
          <h1 className="font-instrumental text-[3.5rem] leading-[0.85] font-normal tracking-tight text-white mix-blend-difference sm:text-[6rem] md:text-[8rem] lg:text-[120px]">
            Assumptions
          </h1>
          <h1 className="font-instrumental mt-2 ml-[40%] text-[3.5rem] leading-[0.85] font-normal tracking-tight text-white mix-blend-difference sm:mt-0 sm:ml-[25%] sm:text-[6rem] md:ml-[29%] md:text-[8rem] lg:text-[120px]">
            Kill Systems
          </h1>
        </div>

        {/* Description Box Overlay */}
        {/* Note: I removed 'absolute' and used 'relative' if you want it to push the container height naturally, 
                    OR kept it absolute but ensured the parent has no extra bottom padding. */}
        <div className="absolute bottom-0 left-0 z-30 mx-auto w-full max-w-[860px] bg-[#191919] p-4 sm:p-6 md:p-12">
          <p className="font-mono text-base leading-relaxed font-semibold text-zinc-100 opacity-90 sm:text-lg md:text-lg">
            Bluethroat Labs is a security research collective focused on making
            TEE-heavy Web3 protocols actually secure, robust, and reliable.
          </p>
        </div>
      </div>
      <Link
        href="/contact"
        className="text-foreground bg-background hover:bg-foreground hover:text-background border-border flex h-18 items-center justify-center border-t border-b text-xl font-semibold transition-colors md:hidden"
      >
        Talk to Us
      </Link>
    </GridBackground>
  )
}
