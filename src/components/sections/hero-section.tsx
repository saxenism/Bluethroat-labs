import { ZCAL_LINK } from '@/lib/constants'
import { GridBackground } from '../ui/grid-background'
import Link from 'next/link'

export function HeroSection() {
  return (
    <GridBackground
      id="hero"
      className="container mx-auto flex h-fit flex-col bg-[#191919]"
      backgroundImage="/images/hero-bg.png"
    >
      <div className="relative flex flex-1 flex-col justify-center px-6 pt-4 pb-0 sm:px-12 md:px-24 md:pt-42">
        <div className="relative z-20 mb-32 flex -translate-x-14 -translate-y-4 flex-col items-center gap-5 py-12 text-center md:mb-48 md:-translate-x-14 md:-translate-y-14 md:gap-11 md:py-0 md:text-left">
          <h1 className="font-instrumental text-[3.5rem] leading-[0.85] font-normal tracking-tight text-white mix-blend-difference sm:text-[6rem] lg:text-[120px]">
            Assumptions
          </h1>
          <h1 className="font-instrumental mt-2 ml-[40%] text-[3.5rem] leading-[0.85] font-normal tracking-tight text-white mix-blend-difference sm:mt-0 sm:ml-[25%] sm:text-[6rem] md:ml-[29%] lg:text-[120px]">
            Kill Systems
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 z-30 mx-auto w-full max-w-[860px] bg-[#191919] p-4 sm:p-6 md:p-12">
          <p className="font-mono text-base leading-relaxed font-semibold text-zinc-100 opacity-90 sm:text-lg md:text-lg">
            Bluethroat Labs is a security research collective focused on making
            TEE-heavy Web3 protocols actually secure, robust, and reliable.
          </p>
        </div>
      </div>

      <Link
        href={ZCAL_LINK}
        target="_blank"
        className="text-foreground bg-background hover:bg-foreground hover:text-background border-border flex h-18 items-center justify-center border-t border-b text-xl font-semibold transition-colors lg:hidden"
      >
        Talk to Us
      </Link>
    </GridBackground>
  )
}
