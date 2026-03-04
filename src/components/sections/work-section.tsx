'use client'

import { useState, useEffect } from 'react'
import Image from 'next-export-optimize-images/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ZCAL_LINK } from '@/lib/constants'

export function WorkSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const stripImage = mounted
    ? isDark
      ? '/dark-mode/dark-strip.png'
      : '/light-mode/light-strip.png'
    : null

  const icons =
    mounted && isDark
      ? [
          '/dark-mode/dark-icon-1.png',
          '/dark-mode/dark-icon-2.png',
          '/dark-mode/dark-icon-3.png',
        ]
      : [
          '/light-mode/light-Icon-1.png',
          '/light-mode/light-Icon-2.png',
          '/light-mode/light-Icon-3.png',
        ]

  return (
    <section className="bg-background border-border text-foreground mt-17 border-t font-mono">
      {/* Header Row */}
      <div className="border-border flex border-b">
        <div className="flex h-full items-center">
          <div className="border-border flex h-full min-w-[170px] items-center border-r bg-zinc-100 px-6 py-4 sm:min-w-[250px] sm:px-12 dark:bg-zinc-900">
            <span className="font-mono text-xl font-semibold whitespace-nowrap uppercase sm:text-2xl">
              Our Work
            </span>
          </div>
        </div>
        <div className="bg-background relative flex-1 overflow-hidden">
          {mounted && stripImage && (
            <Image
              src={stripImage}
              alt="Decorative strip"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Intro Text Row */}
      <div className="border-border bg-background border-b px-6 py-5 sm:px-12 sm:py-8">
        <p className="text-foreground max-w-6xl pb-4 text-base font-medium transition-colors sm:text-lg dark:group-hover:text-white">
          We do three kinds of work. One is public, to raise the baseline for
          the entire ecosystem. The others are private, where we help teams find
          and fix real issues before attackers do.
        </p>
      </div>

      {/* Content Grid */}
      <div className="bg-background grid grid-cols-1 md:grid-cols-3">
        {/* Column 1: The TEE Security Handbook */}
        <div className="border-border flex flex-col border-b md:border-r md:border-b-0">
          <div className="flex-1 px-10 py-8 sm:px-14 sm:pt-12">
            <div className="mb-6 flex h-28 items-center">
              {mounted && (
                <div className="relative h-25 w-25">
                  <Image
                    src={icons[0]}
                    alt="Icon 1"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <h3 className="text-foreground mb-4 text-xl font-semibold sm:text-2xl">
              The TEE Security
              <br />
              Handbook
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed font-medium sm:text-[15px]">
              Our open-source public good. A living handbook that documents TEE
              failure modes, vulnerable patterns, and practical guidance for
              safely designing and deploying TEE-heavy Web3 systems.
            </p>
          </div>
          <Link
            href="/handbook"
            className="text-foreground bg-background hover:bg-foreground hover:text-background border-border flex h-18 items-center justify-center border-t text-xl font-semibold transition-colors"
          >
            Check out the Handbook
          </Link>
        </div>

        {/* Column 2: Confidential Bug Bounty Work */}
        <div className="border-border flex flex-col border-b md:border-r md:border-b-0">
          <div className="flex-1 px-10 pt-4 sm:px-14 sm:pt-12">
            <div className="mb-6 flex h-28 items-center">
              {mounted && (
                <div className="relative h-25 w-25">
                  <Image
                    src={icons[1]}
                    alt="Icon 2"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <h3 className="text-foreground mb-4 text-xl font-semibold sm:text-2xl">
              Confidential Bug
              <br />
              Bounty Work
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed sm:text-[15px]">
              We do ongoing, private vulnerability research across TEE-backed
              protocols. Details stay confidential by default, but the security
              lessons and patterns eventually flow back into the ecosystem
              through the Handbook.
            </p>
          </div>
          <Link
            href={ZCAL_LINK}
            target="_blank"
            className="text-foreground bg-background hover:bg-foreground hover:text-background border-border flex h-18 items-center justify-center border-t text-xl font-semibold transition-colors"
          >
            Talk to Us
          </Link>
        </div>

        {/* Column 3: TEE Vulnerability Reasoning LLM */}
        <div className="flex flex-col">
          <div className="flex-1 px-10 pt-4 pb-12 sm:px-14 sm:pt-12">
            <div className="mb-6 flex h-28 items-center">
              {mounted && (
                <div className="relative h-45 w-45">
                  <Image
                    src={icons[2]}
                    alt="Icon 3"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <h3 className="text-foreground mb-4 text-xl font-semibold sm:text-2xl">
              TEE Vulnerability
              <br />
              Reasoning LLM
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed sm:text-[15px]">
              We are building a specialized LLM agent designed to reason about
              vulnerabilities in Web3 protocols that leverage TEEs in different
              roles and architectures. The goal is to accelerate threat
              modeling, surface risky assumptions early, and help teams converge
              on safer designs faster.
            </p>
          </div>
          <div className="bg-background text-foreground border-border flex h-18 items-center justify-center border-t text-xl font-semibold">
            Coming Soon...
          </div>
        </div>
      </div>
      <div className="border-border bg-background h-16 border-t" />
    </section>
  )
}
