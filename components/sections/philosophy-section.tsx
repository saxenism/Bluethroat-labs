'use client'

import React from 'react'
import { GridBackground } from '../ui/grid-background'
import { CornerUpRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function PhilosophySection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const bgImage = mounted
    ? isDark
      ? '/dark-mode/dark-mission-2.png'
      : '/light-mode/light-mission-2.png'
    : undefined

  return (
    <GridBackground
      className="bg-background border-border relative overflow-hidden border-b py-32"
      backgroundImage={bgImage}
      overlay={
        <div
          className="bg-primary/30 absolute top-0 right-0 bottom-0 w-2"
          aria-hidden="true"
        />
      }
    >
      <span className="text-foreground/30 absolute top-[-320px] right-0 mt-2 mr-4 flex items-end font-mono text-base whitespace-nowrap uppercase sm:text-base">
        2/2
      </span>

      {/* Content Container */}
      <div className="ml-0 max-w-4xl px-6 sm:px-12 md:px-24">
        <div className="space-y-12">
          <div className="mt-48">
            <p className="font-instrumental text-foreground mb-6 max-w-xl text-2xl leading-relaxed drop-shadow-sm sm:text-3xl md:text-3xl">
              As TEEs move deeper into Web3, clarity becomes critical.
              Assumptions about hardware trust do not survive adversarial
              settings.
            </p>

            <p className="font-instrumental text-foreground max-w-2xl text-3xl leading-relaxed drop-shadow-sm">
              The{' '}
              <Link
                href="/docs"
                className="text-foreground/50 hover:text-foreground italic underline-offset-4 transition-colors"
              >
                TEE Security Handbook
                <CornerUpRight className="ml-2 inline-block stroke-1" />
              </Link>{' '}
              exists to document real guarantees, real failure modes, and
              practical integration patterns.
            </p>
          </div>
        </div>
      </div>
    </GridBackground>
  )
}
