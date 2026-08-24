'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { FindingLogo } from './finding-logo'
import type {
  FeaturedFinding,
  FindingSeverity,
} from '@/lib/sanity/proof-of-work'

const FINDING_SEVERITY_STYLES: Record<FindingSeverity, string> = {
  critical: 'bg-[#650000]/80 dark:bg-[#650000]/30',
  high: ' bg-[#C00000]/80 dark:bg-[#C00000]/30',
  medium: 'bg-[#FF9D00]/80 dark:bg-[#FF9D00]/30',
  low: 'bg-[#FFDE21]/80 dark:bg-[#FFDE21]/30',
}

export const FindingsCarousel = ({
  findings,
}: {
  findings: FeaturedFinding[]
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 5000, playOnInit: false, stopOnInteraction: false })]
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const isVisibleRef = useRef(false)
  const isInteractingRef = useRef(false)

  const updateNavigation = useCallback(() => {
    if (!emblaApi) return

    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    updateNavigation()
    emblaApi.on('select', updateNavigation)
    emblaApi.on('reInit', updateNavigation)

    return () => {
      emblaApi.off('select', updateNavigation)
      emblaApi.off('reInit', updateNavigation)
    }
  }, [emblaApi, updateNavigation])

  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi.plugins()?.autoplay
    if (!autoplay) return
    const rootNode = emblaApi.rootNode()
    if (!rootNode) return

    const stop = () => autoplay.stop()
    const play = () => {
      if (isVisibleRef.current && !isInteractingRef.current) {
        autoplay.play()
      }
    }

    const updateViewportAutoplay = (entry: IntersectionObserverEntry) => {
      isVisibleRef.current =
        entry.isIntersecting && entry.intersectionRatio >= 0.3

      if (isVisibleRef.current && !isInteractingRef.current) autoplay.play()
      else autoplay.stop()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(updateViewportAutoplay)
      },
      { threshold: 0.3 }
    )

    const handlePointerDown = () => {
      isInteractingRef.current = true
      stop()
    }
    const handlePointerUp = () => {
      isInteractingRef.current = false
      play()
    }
    const handleSelect = () => {
      if (isVisibleRef.current && !isInteractingRef.current) {
        autoplay.play()
      }
    }

    observer.observe(rootNode)
    emblaApi.on('select', handleSelect)
    emblaApi.on('pointerUp', handlePointerUp)
    emblaApi.on('pointerDown', handlePointerDown)

    return () => {
      stop()
      observer.disconnect()
      emblaApi.off('select', handleSelect)
      emblaApi.off('pointerUp', handlePointerUp)
      emblaApi.off('pointerDown', handlePointerDown)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <div
      className="flex h-full min-h-100 flex-col"
      role="region"
      aria-label="Featured security findings"
      aria-roledescription="carousel"
    >
      <div className="min-h-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {findings.map((finding, index) => (
            <FindingCard
              key={finding._key}
              finding={finding}
              index={index}
              total={findings.length}
            />
          ))}
        </div>
      </div>

      <div className="border-border flex h-18 shrink-0 items-center justify-end border-t">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous finding"
          className="border-border border-l p-2 hover:bg-[#E6E6E6] disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-[#292929] disabled:[&_svg]:opacity-20"
        >
          <ChevronLeft className="h-14 w-14 opacity-70" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next finding"
          className="border-border border-l p-2 hover:bg-[#E6E6E6] disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-[#292929] disabled:[&_svg]:opacity-20"
        >
          <ChevronRight className="h-14 w-14 opacity-70" />
        </button>
      </div>
    </div>
  )
}

const FindingCard = ({
  finding,
  index,
  total,
}: {
  finding: FeaturedFinding
  index: number
  total: number
}) => {
  const severityStyle = FINDING_SEVERITY_STYLES[finding.severity]

  return (
    <article
      className="flex min-w-0 flex-[0_0_100%] flex-col border-r select-none"
      role="group"
      aria-label={`${index + 1} of ${total}`}
      aria-roledescription="slide"
    >
      <div
        className={cn(
          'flex h-12 shrink-0 items-center px-6 text-sm font-bold tracking-wide text-[#FAFAFA] uppercase md:px-12',
          severityStyle
        )}
      >
        {finding.severity}
      </div>

      <div className="relative flex flex-1 flex-col px-6 py-8 md:p-12">
        <div>
          {!!(finding.logo || finding.lightLogo) && (
            <FindingLogo
              logo={finding.logo}
              lightLogo={finding.lightLogo}
              alt={finding.name}
              width={160}
              height={40}
              className="h-10 w-auto max-w-[calc(100%-4rem)] object-contain object-left"
            />
          )}
          {!finding.logo && !finding.lightLogo && (
            <span className="text-2xl font-bold tracking-[-2%] uppercase">
              {finding.name}
            </span>
          )}
        </div>

        <h3 className="font-instrumental mt-4 text-2xl tracking-[2%] md:text-[32px]">
          {finding.title}
        </h3>

        <p className="mt-2 text-sm text-[#2E2E2E] md:text-base dark:text-[#A9A9A9]">
          {finding.description}
        </p>

        <Link
          href={finding.link}
          aria-label={`Read ${finding.title}`}
          className="border-border hover:bg-foreground hover:text-background absolute top-0 right-0 grid size-14 place-items-center border-b border-l transition-colors md:size-18"
          target="_blank"
        >
          <ArrowUpRightIcon className="size-10 md:size-15" />
        </Link>
      </div>
    </article>
  )
}
