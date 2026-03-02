'use client'

import { useCallback, useState, useEffect } from 'react'
import { GridBackground } from '../ui/grid-background'
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react'
import Image from 'next-export-optimize-images/image'
import { useTheme } from 'next-themes'
import useEmblaCarousel from 'embla-carousel-react'

const team = [
  {
    name: 'Rahul Saxena',
    role: 'Founder . ex-ZKSync',
    image: '/team/Rahul-Saxena.png',
    xUrl: 'https://x.com/pankaj',
    email: 'rahul@bluethroat.ai',
  },
  {
    name: 'Tanmay Goel',
    role: 'Researcher . ex-NVIDIA',
    image: '/team/Tanmay-Goel.png',
    xUrl: 'https://x.com/tanmay',
  },
  {
    name: 'Abhimanyu Gupta',
    role: 'Researcher . Malware Analyst',
    image: '/team/Abhimanyu-Gupta.png',
    xUrl: 'https://x.com/nishit',
  },
  {
    name: 'Chloe',
    role: 'Research . ex-Binance Research',
    image: '/team/Chloe.png',
    xUrl: 'https://x.com/nishit',
  },
  {
    name: 'Utkarsh Verma',
    role: 'Our Rockstar Intern',
    image: '/team/Utkarsh-Verma.png',
    xUrl: 'https://x.com/nishit',
  },
]

export function TeamSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Initialize Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

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
    <GridBackground
      className="bg-background border-border border-b py-17"
      withNoise={true}
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Architectural Header */}
        <div className="border-border flex h-17 items-stretch border-y">
          <div className="flex h-full items-center">
            <div className="border-border flex h-full min-w-[180px] items-center border-r bg-zinc-50 px-12 sm:min-w-[250px] dark:bg-zinc-900">
              <span className="font-mono text-xl font-semibold whitespace-nowrap uppercase sm:text-2xl">
                Our Team
              </span>
            </div>
          </div>
          <div className="relative h-full flex-1 overflow-hidden">
            {stripImage && (
              <Image
                src={stripImage}
                alt="Decorative strip"
                fill
                className="object-cover object-center"
              />
            )}
          </div>
        </div>

        {/* Intro Text Row */}
        <div className="group border-border bg-background border-b px-6 py-6 transition-colors hover:bg-zinc-50 sm:px-12 sm:py-8 dark:hover:bg-zinc-900">
          <p className="max-w-6xl text-base font-medium transition-colors sm:text-lg dark:group-hover:text-white">
            We are a small but dedicated team of researchers and builders,
            united by a passion for security and a commitment to making
            TEE-backed systems safer.
          </p>
        </div>

        {/* Team Members Carousel */}
        <div className="border-border overflow-hidden border-b" ref={emblaRef}>
          {/* REMOVED: divide-x divide-border from this div */}
          <div className="flex">
            {team.map((member, index) => (
              <div
                key={index}
                /* ADDED: border-r border-border to ensure the line travels with the slide in loop mode */
                className="group border-border min-w-0 flex-[0_0_100%] border-r p-4 md:flex-[0_0_33.333%]"
              >
                <div className="relative aspect-12/11 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="absolute right-0 bottom-0 flex">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="group/mail bg-background border-border hover:bg-foreground flex h-16 w-16 items-center justify-center border-t border-l transition-colors"
                      >
                        <Mail className="text-foreground group-hover/mail:text-background h-8 w-8 transition-colors" />
                      </a>
                    )}
                    <a
                      href={member.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social bg-background border-border hover:bg-foreground flex h-16 w-16 items-center justify-center border-t border-l transition-colors"
                    >
                      <svg
                        className="fill-foreground group-hover/social:fill-background h-8 w-8 transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mt-2 space-y-4">
                    <h3 className="font-mono text-2xl tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-foreground/50 font-mono text-base">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="border-border flex items-center justify-end border-b">
          <button
            onClick={scrollPrev}
            className="border-border border-l p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
          >
            <ChevronLeft className="h-14 w-14 opacity-70" />
          </button>
          <button
            onClick={scrollNext}
            className="border-border border-l p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
          >
            <ChevronRight className="h-14 w-14 opacity-70" />
          </button>
        </div>
      </div>
    </GridBackground>
  )
}
