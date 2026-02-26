'use client'

import { Mail } from 'lucide-react'

export function JoinUsSection() {
  return (
    <section className="border-border relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b bg-white select-none dark:bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.4]"
        style={{
          backgroundImage: 'url(/dark-mode/dark-footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) brightness(1)',
        }}
      />

      {/* Center Card */}
      <div className="bg-background border-border relative z-10 mx-6 w-full max-w-4xl overflow-hidden border shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="p-8 text-center sm:py-10 md:py-10">
          <span className="text-foreground mb-6 block font-mono text-xl font-bold uppercase">
            JOIN US
          </span>

          <h2 className="font-instrumental mb-6 text-3xl leading-[1.1] font-normal text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-100">
            We&apos;re always looking for people who take security seriously and
            enjoy going deep.
          </h2>
          <p className="mx-auto max-w-3xl font-mono text-xs leading-[1.8] font-medium text-zinc-500 sm:text-sm md:text-base">
            If you have real experience with TEEs, in Web3 or outside it, or
            you&apos;re the kind of person who likes tinkering, breaking
            systems, and learning new security paradigms, we&apos;d love to hear
            from you.
          </p>
        </div>

        {/* CTA Button/Bar */}
        <a
          href="mailto:hello@bluethroat.ai"
          className="group relative flex items-center justify-center gap-4 overflow-hidden bg-zinc-900 px-10 py-5 text-zinc-100 transition-all hover:bg-black dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <div className="absolute inset-0 translate-x-full bg-white/10" />
          <Mail className="relative z-10 h-8 w-8" />
          <span className="relative z-10 font-mono text-sm font-semibold sm:text-lg">
            Send us a short intro
          </span>
        </a>
      </div>
    </section>
  )
}
