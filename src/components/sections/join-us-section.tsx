'use client'

import { MailIcon } from '@/assets/icons'
import Image from 'next/image'

export function JoinUsSection() {
  return (
    <section className="border-border relative isolate grid place-items-center border-b px-4 py-18 md:py-36">
      <Image
        src="/join-us/bg-dark.png"
        alt="Background"
        fill
        className="none -z-1 hidden object-cover dark:block"
      />
      <Image
        src="/join-us/bg-light.png"
        alt="Background"
        fill
        className="none -z-1 object-cover dark:hidden"
      />

      <div className="border-border relative w-full max-w-4xl border bg-[#F2F2F2] dark:bg-[#191919]">
        <div className="px-4 pt-12 pb-18 text-center md:p-12">
          <span className="text-foreground mb-6 block text-base font-semibold uppercase md:mb-8 md:text-2xl">
            JOIN US
          </span>

          <h2 className="font-instrumental mb-4 text-[32px] leading-tight font-normal text-pretty md:mb-6 md:text-5xl">
            We&apos;re always looking for people who take security seriously and
            enjoy going deep.
          </h2>

          <p className="leading-relaxed font-medium text-pretty text-[#666666] dark:text-[#8F8F8F]">
            If you have real experience with TEEs, in Web3 or outside it, or
            you&apos;re the kind of person who likes tinkering, breaking
            systems, and learning new security paradigms, we&apos;d love to hear
            from you.
          </p>
        </div>

        <a
          href="mailto:saxenism@bluethroatlabs.com"
          className="hover:dark:bg-foreground hover:bg-foreground flex h-18 items-center justify-center gap-4 bg-[#292929] text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929]"
        >
          <MailIcon className="h-6 w-6" />
          <span className="text-xl leading-relaxed font-semibold">
            Send us a short intro
          </span>
        </a>
      </div>
    </section>
  )
}
