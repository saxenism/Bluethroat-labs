'use client'

import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { MailIcon, XIcon } from '@/assets/icons'
import { LandingStripImage } from '../ui/landing-strip-image'

export function TeamSection() {
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
      id="our-team"
      className="border-border relative isolate border-b py-17"
    >
      <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
        <div className="border-border flex h-full items-center border-r px-4 md:px-12">
          <span className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
            Our Team
          </span>
        </div>

        <div className="none relative h-full flex-1 overflow-hidden">
          <LandingStripImage />
        </div>
      </div>

      <div className="border-border border-b px-4 pt-6 pb-12 md:px-12">
        <p className="text-base font-medium text-[#454545] md:text-lg dark:text-[#A9A9A9]">
          A small team of domain experts obsessed with understanding how systems
          actually break. We are researchers and builders who believe
          domain-specific security is how Web3 wins — and we are here to prove
          it.
        </p>
      </div>

      <div className="border-border overflow-hidden border-b" ref={emblaRef}>
        <div className="flex">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.name} member={member} />
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

const TeamCard = ({ member }: { member: (typeof TEAM_MEMBERS)[number] }) => {
  return (
    <div className="group border-border min-w-0 flex-[0_0_100%] border-r bg-transparent p-4 pb-6 select-none hover:bg-[#f2f2f2] md:flex-[0_0_33.333%] md:pb-8 dark:hover:bg-[#191919]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          width={384}
          height={384}
          className="aspect-square w-full object-cover"
        />

        <div className="absolute right-0 bottom-0 flex">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="border-border bg-background grid size-14 place-items-center border-r hover:bg-[#E6E6E6] md:size-18 dark:hover:bg-[#292929]"
            >
              <MailIcon className="text-[#292929] max-md:size-5.5 dark:text-[#A9A9A9]" />
            </a>
          )}
          {member.xUrl && (
            <a
              href={member.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background grid size-14 place-items-center hover:bg-[#E6E6E6] md:size-18 dark:hover:bg-[#292929]"
            >
              <XIcon className="text-[#292929] max-md:size-4.5 dark:text-[#A9A9A9]" />
            </a>
          )}
        </div>
      </div>

      <div className="p-4 pb-0">
        <h3 className="text-2xl font-semibold tracking-tight">{member.name}</h3>
        <p className="mt-4 flex items-center gap-2 text-base text-[#666666] dark:text-[#8F8F8F]">
          {member.role}
          {member.exRole && (
            <>
              <span className="text-xl leading-none">•</span>
              {member.exRole}
            </>
          )}
        </p>
      </div>
    </div>
  )
}

const TEAM_MEMBERS = [
  {
    name: 'Rahul Saxena',
    role: 'Founder',
    exRole: 'ex-ZKSync',
    image: '/team/rahul.png',
    xUrl: 'https://x.com/saxenism',
    email: 'saxenism@bluethroatlabs.com',
  },
  {
    name: 'Tanmay Goel',
    role: 'Researcher',
    exRole: 'ex-NVIDIA',
    image: '/team/tanmay.png',
    xUrl: 'https://x.com/guyphy4',
    email: '0xbitcrusader@gmail.com',
  },
  {
    name: 'Abhimanyu Gupta',
    role: 'Researcher',
    exRole: 'Malware Analyst',
    image: '/team/abhimanyu.png',
    xUrl: 'https://x.com/hackerjedi666',
    email: 'abhimanyu.gupta@rubberduckypro.com',
  },
  {
    name: 'Chloe',
    role: 'Research',
    exRole: 'ex-Binance Research',
    image: '/team/chloe.png',
    xUrl: 'https://x.com/thryec',
  },
  {
    name: 'Utkarsh Verma',
    role: 'Our Rockstar Intern',
    image: '/team/utkarsh.png',
    xUrl: 'https://x.com/doormamu901',
  },
]
