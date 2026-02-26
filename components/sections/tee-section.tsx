'use client'

import { useState, useEffect } from 'react'
import { GridBackground } from '../ui/grid-background'
import { useTheme } from 'next-themes'

export function TeeSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const bgImage = mounted
    ? isDark
      ? '/dark-mode/dark-mission-1.png'
      : '/light-mode/light-mission-1.png'
    : undefined

  return (
    <GridBackground
      className="bg-background border-border relative mt-18 border-b py-60"
      backgroundImage={bgImage}
    >
      <span className="text-foreground/30 absolute top-[-240px] right-0 mt-2 mr-4 flex items-end font-mono text-base whitespace-nowrap uppercase sm:text-base">
        1/2
      </span>
      <div
        className="bg-primary/30 absolute top-0 right-0 h-90 w-2 -translate-y-60"
        aria-hidden="true"
      />

      {/* The 'text-right' here ensures all inline content leans right */}
      <div className="mx-auto max-w-7xl px-12 text-right sm:px-24">
        {/* Use 'flex flex-col items-end' as a backup to force children to the right */}
        <div className="flex flex-col items-end">
          <div className="w-full">
            {/* Added 'ml-auto' to move the box to the right */}
            <p className="text-foreground mb-6 ml-auto max-w-3xl text-right font-mono text-lg leading-relaxed font-medium drop-shadow-sm sm:text-xl md:text-2xl">
              Trusted Execution Environments are a proven security primitive.
              They have been used for years in phones, payments, and other
              security-critical systems.
            </p>

            {/* Added 'ml-auto' to move the box to the right */}
            <p className="text-foreground mb-6 ml-auto max-w-4xl text-right font-mono text-xl leading-relaxed font-semibold drop-shadow-sm sm:text-xl md:text-2xl">
              In Web3, TEEs are held to a different bar. Hardware trust sits
              uneasily with decentralisation and transparency.
            </p>
          </div>

          {/* Added 'ml-auto' and 'text-right' to the quote section */}
          <div className="w-full text-right">
            <div>
              <p className="font-instrumental text-foreground text-xl leading-relaxed drop-shadow-sm sm:text-3xl">
                That tension cannot be ignored. <br />
                If it is not modelled honestly, it fails in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GridBackground>
  )
}
