'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Copyright } from 'lucide-react'
import { MouseEvent } from 'react'
import { SanskritHoverText } from '@/components/ui/sanskrit-hover-text'
import { IconLogo, TextLogo } from '@/assets/logos'
import Image from 'next-export-optimize-images/image'
import { MailIcon, XIcon } from '@/assets/icons'

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/reveries', label: 'Reveries' },
  { href: '/join', label: 'Join Us' },
]

export function Footer() {
  const pathname = usePathname()

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-background border-border mt-17 border-y">
      <div className="border-border border-b bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="border-border container mx-auto flex flex-col items-stretch md:flex-row">
          <div className="border-border group flex items-center justify-center border-b px-5 py-6 md:h-17 md:justify-start md:border-r md:border-b-0 md:py-0">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group flex items-center"
            >
              <IconLogo />
            </Link>
            <Link
              href="/"
              onClick={handleLogoClick}
              className="items-center max-md:flex md:hidden"
            >
              <TextLogo />
            </Link>
          </div>

          <div className="border-border flex w-full flex-col border-b md:flex-row md:items-center md:border-b-0">
            <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-8 py-8 md:flex-row md:justify-start md:space-y-0 md:space-x-10 md:py-0">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-lg">
                  <SanskritHoverText
                    text={link.label}
                    inactiveCharClassName="text-foreground/70 group-hover:text-foreground"
                    className="group"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex h-12 items-center justify-center md:h-17">
            <a
              href="mailto:hello@bluethroat.ai"
              className="grid aspect-square h-full place-items-center border-l hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
            >
              <MailIcon className="text-[#292929] max-md:size-5.5 dark:text-[#A9A9A9]" />
            </a>
            <a
              href="https://x.com/bluethroat_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="grid aspect-square h-full place-items-center border-l hover:bg-[#E6E6E6] max-md:border-r dark:hover:bg-[#292929]"
            >
              <XIcon className="text-[#292929] max-md:size-4.5 dark:text-[#A9A9A9]" />
            </a>
          </div>
        </div>
      </div>

      <div className="none relative mt-12 h-64 w-full overflow-hidden bg-[#f2f2f2] sm:h-80 md:h-[400px] dark:bg-[#191919]">
        <Image
          src="/landing/footer-bg-light.png"
          alt="Footer"
          fill
          className="object-cover dark:hidden"
        />
        <Image
          src="/landing/footer-bg-dark.png"
          alt="Footer"
          fill
          className="hidden object-cover dark:block"
        />
      </div>

      <div className="border-border text-foreground flex items-center justify-center border-t bg-[#f2f2f2] p-3 text-sm dark:bg-[#191919]">
        <p className="flex items-center gap-2 whitespace-nowrap">
          <Copyright className="text-foreground/70 h-6 w-6" />
          <span className="text-foreground/70 text-base font-medium">
            {new Date().getFullYear()} Bluethroat Labs
          </span>
        </p>
      </div>
    </footer>
  )
}
