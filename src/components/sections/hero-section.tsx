import { ZCAL_LINK } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate container mx-auto flex h-fit flex-col bg-[#191919]"
    >
      <Image
        src="/landing/hero-bg.png"
        alt="Background"
        fill
        className="none -z-1 object-cover opacity-50"
      />

      <div className="relative grid place-items-center px-2 pt-14 pb-72 md:pt-18 md:pb-80">
        <div className="font-instrumental w-full max-w-xs text-[60px] leading-tight text-[#F2F2F2] sm:max-w-md sm:text-[80px] lg:max-w-2xl lg:text-[120px]">
          <h1>Assumptions</h1>
          <h1 className="text-right">Kill Systems</h1>
        </div>

        <div className="absolute bottom-0 left-0 z-30 mx-auto w-full max-w-[830px] bg-[#191919] p-4 sm:p-6 lg:p-12">
          <div className="flex flex-col gap-3 text-[#F2F2F2] sm:gap-4">
            <p className="text-base leading-relaxed font-medium sm:text-lg md:text-lg">
              We build domain-specific AI security agents for complex protocol architectures.
            </p>
            <p className="text-base leading-relaxed font-medium sm:text-lg md:text-lg">
              One agent per domain.
            </p>
            <p className="text-base leading-relaxed font-medium sm:text-lg md:text-lg">
              All of them sharing intelligence to stop cascading failures.
            </p>
          </div>
        </div>
      </div>

      <Link
        href={ZCAL_LINK}
        target="_blank"
        className="text-foreground bg-background hover:bg-foreground hover:text-background border-border flex h-18 items-center justify-center border-t border-b text-xl font-semibold lg:hidden"
      >
        Talk to Us
      </Link>
    </section>
  )
}
