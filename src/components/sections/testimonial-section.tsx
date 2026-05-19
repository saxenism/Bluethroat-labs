'use client'

import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import type { TestimonialItem } from '@/lib/sanity/testimonials'
import Link from 'next/link'
import { LandingStripImage } from '../ui/landing-strip-image'

interface TestimonialSectionProps {
  testimonials: TestimonialItem[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
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

  return (
    <section
      id="testimonials"
      className="border-border relative isolate border-b py-17"
    >
      <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
        <div className="border-border flex h-full items-center border-r px-4 md:px-12">
          <h2 className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
            ATTESTATIONS
          </h2>
        </div>

        <div className="none relative h-full flex-1 overflow-hidden">
          <LandingStripImage />
        </div>
      </div>

      <div className="border-border overflow-hidden border-b" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="border-border flex items-center justify-end border-b">
        <button
          onClick={scrollPrev}
          className="border-border border-l p-2 hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
        >
          <ChevronLeft className="h-14 w-14 opacity-70" />
        </button>
        <button
          onClick={scrollNext}
          className="border-border border-l p-2 hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
        >
          <ChevronRight className="h-14 w-14 opacity-70" />
        </button>
      </div>
    </section>
  )
}

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  return (
    <div className="group border-border min-w-0 flex-[0_0_100%] border-r bg-transparent select-none">
      <div className="relative flex h-full flex-col overflow-hidden p-12">
        <div className="mb-8 md:mb-16">
          <Image
            src="/landing/quote-light.png"
            alt="Quote Icon Light"
            width={100}
            height={88}
            className="h-auto w-full max-w-25 object-contain max-md:max-w-19 dark:hidden"
          />
          <Image
            src="/landing/quote-dark.png"
            alt="Quote Icon Dark"
            width={100}
            height={88}
            className="hidden h-auto w-full max-w-25 object-contain max-md:max-w-19 dark:block"
          />
        </div>

        <div className="md:mb-auto [&_a]:underline [&_li]:ml-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_p]:mb-4 [&_p]:text-base [&_p]:leading-loose [&_p]:font-semibold [&_p]:text-[#454545] md:[&_p]:text-lg dark:[&_p]:text-[#8F8F8F] [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc">
          {item.review}
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-6 max-md:flex-col md:mt-18 md:items-center">
          <div className="flex items-center gap-4 md:gap-6">
            <Image
              src={item.image ?? '/landing/default-profile.png'}
              alt={item.personName ?? 'Default Profile'}
              width={72}
              height={72}
              className="aspect-square rounded-full object-contain max-md:size-12"
            />

            <div>
              {item.xUrl ? (
                <Link
                  href={item.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-loose font-semibold hover:underline md:text-xl"
                >
                  {item.personName}
                </Link>
              ) : (
                <p className="text-base leading-loose font-semibold md:text-xl">
                  {item.personName}
                </p>
              )}
              <p className="text-sm font-semibold text-[#2E2E2E] md:text-lg dark:text-[#CACACA]">
                {item.role}
              </p>
            </div>
          </div>

          <div>
            {!!item.logo?.light && (
              <Image
                src={item.logo?.light}
                alt={`${item.name} Logo Light`}
                width={100}
                height={50}
                className="h-full max-h-12.5 w-auto object-contain max-md:max-h-8 dark:hidden"
              />
            )}
            {!!item.logo?.dark && (
              <Image
                src={item.logo?.dark}
                alt={`${item.name} Logo Dark`}
                width={100}
                height={50}
                className="hidden h-full max-h-12.5 w-auto object-contain max-md:max-h-8 dark:block"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
