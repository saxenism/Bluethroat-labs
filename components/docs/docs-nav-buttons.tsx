'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavButtonProps {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

export function DocsNavButtons({ prev, next }: NavButtonProps) {
  if (!prev && !next) return null

  // This constant holds the font variable class name
  const baiFont = 'var(--font-bai-jamjuree)'

  return (
    <div className="mt-12 mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Previous Button */}
      {prev ? (
        <Link
          href={prev.href}
          className="group bg-background border-border hover:border-foreground border p-5 transition-all duration-300"
        >
          <div className="mb-4 flex items-center justify-between">
            <div
              className="text-muted-foreground flex items-center gap-2 text-xs transition-colors"
              style={{ fontFamily: baiFont }} // Applying Bai Jamjuree
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-base font-semibold">Previous</span>
            </div>
            <div className="text-muted-foreground hidden items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] font-bold sm:flex">
              <span className="bg-muted p-1 text-xs">Cmd</span>
              <span>
                <ArrowLeft className="bg-muted h-6 w-6 stroke-2 p-1" />
              </span>
            </div>
          </div>
          <div className="group-hover:text-foreground text-lg leading-tight font-semibold transition-colors">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Next Button */}
      {next ? (
        <Link
          href={next.href}
          className="group bg-background border-border hover:border-foreground border p-5 transition-all duration-300"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-muted-foreground hidden items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] font-bold sm:flex">
              <span className="bg-muted p-1 text-xs">Cmd</span>
              <span>
                <ArrowRight className="bg-muted h-6 w-6 stroke-2 p-1" />
              </span>
            </div>
            <div
              className="text-muted-foreground flex items-center gap-2 text-xs transition-colors"
              style={{ fontFamily: baiFont }}
            >
              <span className="text-base font-semibold">Next</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <div className="group-hover:text-foreground text-right text-lg leading-tight font-semibold transition-colors">
            {next.title}
          </div>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}
    </div>
  )
}
