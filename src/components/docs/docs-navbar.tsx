'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SanskritHoverText } from '@/components/ui/sanskrit-hover-text'
import { TEESecurityHandbookLogo } from '@/assets/logos'
import { ZCAL_LINK } from '@/lib/constants'

export function DocsNavbar({ version }: { version?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '/', label: 'Website' },
    { href: '/reveries', label: 'Reveries' },
    { href: ZCAL_LINK, label: 'Talk to Us' },
  ]

  return (
    <nav className="border-border bg-background sticky top-0 right-0 left-0 z-50 w-full border-b max-lg:mt-12 max-lg:border-t">
      <div className="border-border flex h-11.5 w-full items-center lg:h-17.75">
        <Link
          href="/"
          className="lg:border-border flex h-full items-center gap-2 px-4 py-3 lg:w-80 lg:justify-between lg:border-r lg:px-6 lg:py-5"
        >
          <TEESecurityHandbookLogo className="max-lg:h-6 max-lg:w-auto" />

          {!!version && (
            <span className="bg-[#E6E6E6] px-2 py-0.5 text-[10px] font-semibold tracking-tight text-[#7D7D7D] lg:text-sm dark:bg-[#292929]">
              {version}
            </span>
          )}
        </Link>

        <div className="hidden h-full flex-1 items-center space-x-10 px-8 lg:flex">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                className="text-lg"
              >
                <SanskritHoverText
                  text={link.label}
                  inactiveCharClassName={
                    'text-foreground/70 group-hover:text-foreground'
                  }
                  className="group"
                />
              </Link>
            )
          })}
        </div>

        <div className="border-border ml-auto flex h-full items-center overflow-hidden border-l lg:ml-0">
          <div className="flex h-full items-center">
            <button
              onClick={toggleTheme}
              className="hover:bg-muted p-3.5 lg:p-5.5"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="h-5 w-5 lg:h-7 lg:w-7" />
              ) : resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5 lg:h-7 lg:w-7" />
              ) : (
                <Moon className="h-5 w-5 lg:h-7 lg:w-7" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
