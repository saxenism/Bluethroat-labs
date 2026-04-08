'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ZCAL_LINK } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { LandingStripImage } from '../ui/landing-strip-image'
import { ChevronLeft, ChevronRight, CornerUpRightIcon } from 'lucide-react'
import { WriteupItem } from '@/lib/sanity/writeups'

export function WorkSection({ writeups }: { writeups: WriteupItem[] }) {
  const [isWriteupDialogOpen, setIsWriteupDialogOpen] = useState(false)

  const handleClick = (clickHandler?: string) => {
    if (clickHandler === 'writeup-modal') {
      setIsWriteupDialogOpen(true)
      console.log(writeups)
    }
  }

  return (
    <section className="border-border relative isolate z-2 container mx-auto mt-18 border-b">
      <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
        <div className="border-border flex h-full items-center border-r px-4 md:px-12">
          <h2 className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
            Our Work
          </h2>
        </div>

        <div className="none relative h-full flex-1 overflow-hidden">
          <LandingStripImage />
        </div>
      </div>

      <div className="px-4 pt-6 pb-12 md:px-12">
        <p className="text-base font-medium text-[#454545] md:text-lg dark:text-[#A9A9A9]">
          We operate across three fronts. Research that compounds into public
          knowledge. Private vulnerability work that stays confidential. And
          bespoke security ecosystems built specifically for your protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {WORKS.map((work, index) => (
          <WorkCard
            key={work.title}
            work={work}
            className={
              index === WORKS.length - 1 ? 'lg:border-r-0' : 'max-lg:mb-12'
            }
            handleClick={handleClick}
          />
        ))}
      </div>

      <Dialog open={isWriteupDialogOpen} onOpenChange={setIsWriteupDialogOpen}>
        <DialogContent className="sm:max-w-6xl sm:p-12">
          <DialogTitle className="sr-only">
            Vulnerability research writeups
          </DialogTitle>

          <div className="w-full">
            <div>bookself here</div>

            <div className="mt-12 flex w-full items-center justify-between gap-4">
              <button className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] dark:hover:bg-[#292929]">
                <ChevronLeft className="size-7" />
              </button>

              <Link
                href="/docs"
                className="font-instrumental text-[32px] text-[#8F8F8F] italic hover:text-[#292929] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
              >
                Read the full Writeup{' '}
                <CornerUpRightIcon className="mr-1 ml-1 inline-block size-6 stroke-1" />
              </Link>

              <button className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] dark:hover:bg-[#292929]">
                <ChevronRight className="size-7" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="h-16" />
    </section>
  )
}

const WorkCard = ({
  work,
  className,
  handleClick,
}: {
  work: (typeof WORKS)[number]
  className?: string
  handleClick: (clickHandler?: string) => void
}) => {
  return (
    <div
      className={cn(
        'border-border flex flex-col border-t border-b lg:border-r',
        className
      )}
    >
      <div className="flex-1 p-12">
        <Image
          src={work.icon}
          alt={work.title}
          height={96}
          width={96}
          className={cn(
            'none mb-8 h-24 w-auto object-contain',
            work.iconClassName
          )}
        />
        <h3 className="mb-4 text-xl font-semibold text-[#292929] sm:text-2xl dark:text-[#E6E6E6]">
          {work.title}
        </h3>
        <p className="whitespace-pre-line text-[#666666] dark:text-[#8F8F8F]">
          {work.description}
        </p>
      </div>

      {work.link ? (
        <Link
          href={work.link}
          target={work.link?.startsWith('http') ? '_blank' : undefined}
          className={cn(
            'hover:bg-foreground border-border flex h-18 items-center justify-center border-t px-2 text-center text-xl font-semibold text-[#1F1F1F] hover:text-[#EBEBEB] dark:text-[#EBEBEB] dark:hover:text-[#292929]',
            work.buttonTheme === 'inverse' &&
              'hover:bg-foreground hover:dark:bg-foreground bg-[#292929] text-[#E6E6E6] hover:text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929] hover:dark:text-[#292929]'
          )}
        >
          {work.buttonText}
        </Link>
      ) : work.clickHandler ? (
        <button
          onClick={() => handleClick(work.clickHandler)}
          className={cn(
            'hover:bg-foreground border-border flex h-18 items-center justify-center border-t px-2 text-center text-xl font-semibold text-[#1F1F1F] hover:text-[#EBEBEB] dark:text-[#EBEBEB] dark:hover:text-[#292929]',
            work.buttonTheme === 'inverse' &&
              'hover:bg-foreground hover:dark:bg-foreground bg-[#292929] text-[#E6E6E6] hover:text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929] hover:dark:text-[#292929]'
          )}
        >
          {work.buttonText}
        </button>
      ) : (
        <div className="border-border flex h-18 items-center justify-center border-t px-2 text-center text-xl font-semibold text-[#1F1F1F] dark:text-[#EBEBEB]">
          {work.buttonText}
        </div>
      )}
    </div>
  )
}

const WORKS = [
  {
    icon: '/landing/work-icon-1.png',
    iconClassName: 'dark:opacity-50',
    title: 'The TEE Security Handbook',
    description:
      "Every domain we study produces knowledge that shouldn't stay private. The TEE Security Handbook documents real failure modes, vulnerable patterns, and practical guidance for safely deploying TEE-heavy Web3 systems — built from confirmed findings across production codebases, not just theoretical analysis. More handbooks on the way.",
    link: '/docs',
    buttonText: 'Check out the Handbook',
    buttonTheme: 'inverse',
  },
  {
    icon: '/landing/work-icon-2.png',
    iconClassName: 'dark:opacity-50',
    title: 'Vulnerability Research',
    description:
      'Our research takes us deep into production codebases. When we find something real, we pursue it — across TEE protocols, consensus implementations, ZK systems, and beyond. We proactively reach out to concerned teams and responsibly disclose vulnerabilities. The patterns we uncover eventually flow back into our public research.',
    link: undefined,
    clickHandler: 'writeup-modal',
    buttonText: 'Writeups',
    buttonTheme: 'primary',
  },
  {
    icon: '/landing/work-icon-3.png',
    iconClassName: 'dark:invert',
    title: 'Protocol Security Ecosystems',
    description:
      'Domain-specific AI agents, built for your codebase, reasoning together across subsystems. Each one learns your protocol more deeply with every run. \n Blind spots are unavoidable. That is why monitoring is treated as a first-class citizen of the security stack, not an afterthought.',
    link: ZCAL_LINK,
    buttonText: 'Talk to Us',
    buttonTheme: 'primary',
  },
]
