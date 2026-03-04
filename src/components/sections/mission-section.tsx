'use client'

import { useState, useEffect } from 'react'
import { GridBackground } from '../ui/grid-background'
import { useTheme } from 'next-themes'
import Image from 'next-export-optimize-images/image'

export function MissionSection() {
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

  return (
    <GridBackground className="bg-background border-border z-2 container mx-auto mt-18 border-b">
      {/* Segment Divider for Mission - Architectural Slices */}
      <div className="border-border flex h-16 items-stretch border-y bg-zinc-50 px-0 dark:bg-zinc-950">
        <div className="flex h-full items-center">
          <div className="border-border flex h-full min-w-[200px] items-center border-r bg-zinc-100 px-8 sm:min-w-[300px] sm:px-12 dark:bg-zinc-900">
            <span className="font-mono text-xl font-semibold whitespace-nowrap uppercase sm:text-2xl">
              Our Mission
            </span>
          </div>
        </div>
        {/* Dark area to the right of Our Mission */}
        <div className="relative h-full flex-1 overflow-hidden">
          {mounted && stripImage && (
            <Image
              src={stripImage}
              alt="Decorative strip"
              fill
              className="object-cover opacity-50 contrast-125"
            />
          )}
        </div>
      </div>

      <div className="px-4 py-14 sm:px-12 md:px-12">
        <div className="max-w-6xl pb-4">
          <p className="text-foreground/80 font-mono text-sm leading-relaxed sm:text-2xl">
            At Bluethroat Labs, our mission is to accelerate the security
            maturity of Trusted Execution Environments (TEEs) in Web3. The smart
            contract ecosystem only became meaningfully safer once vulnerable
            patterns and hard-earned lessons were openly documented and best
            practices were widely internalized. Before that, security knowledge
            stayed trapped in isolated &quot;security islands,&quot; slowing
            progress while attackers only needed to be right once.
          </p>
        </div>
      </div>
    </GridBackground>
  )
}
