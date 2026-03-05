'use client'

import { useState, useEffect, MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { SanskritHoverText } from '@/components/ui/sanskrit-hover-text'
import { FullLogo, IconLogo } from '@/assets/logos'
import { ZCAL_LINK } from '@/lib/constants'

export function StickyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/reveries', label: 'Reveries' },
    { href: '/join', label: 'Join Us' },
  ]

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className="border-border bg-background sticky top-0 right-0 left-0 z-50 container mx-auto border-t border-b">
      <div className="border-border container mx-auto flex h-12 items-center lg:h-18">
        {/* Logo Section */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="border-border h-full border-r p-3 lg:px-6 lg:py-5"
        >
          <FullLogo className="max-lg:hidden" />
          <IconLogo className="size-6 lg:hidden" />
        </Link>

        {/* Desktop Navigation Section */}
        <div className="border-border hidden h-full flex-1 items-center space-x-10 border-r px-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn('text-lg', isActive && 'font-bold')}
              >
                <SanskritHoverText
                  text={link.label}
                  inactiveCharClassName={
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground/70 group-hover:text-foreground'
                  }
                  className={isActive ? 'font-bold' : 'group'}
                />
              </Link>
            )
          })}
        </div>

        {/* Talk to Us Section - Hidden on Mobile */}
        <div className="border-border hidden h-full border-r lg:flex">
          <Link
            href={ZCAL_LINK}
            target="_blank"
            className="hover:bg-foreground hover:text-background flex h-full items-center justify-center px-8 text-xl font-semibold"
          >
            Talk to Us
          </Link>
        </div>

        {/* Right Side Section: Theme Toggle & Hamburger */}
        <div className="ml-auto flex h-full items-center overflow-hidden lg:ml-0">
          <div className="hidden h-full items-center lg:flex">
            <button
              onClick={toggleTheme}
              className="hover:bg-muted p-5.5"
              aria-label="Toggle theme"
            >
              {/* Only render the icon if mounted to prevent hydration mismatch */}
              {!mounted ? (
                <div className="h-7 w-7" /> // Placeholder with same dimensions
              ) : resolvedTheme === 'dark' ? (
                <Sun className="h-7 w-7" />
              ) : (
                <Moon className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button - Segmented */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="border-border hover:bg-muted flex h-full flex-col justify-center gap-1 border-l px-3 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'bg-foreground block h-0.75 w-6 rounded-full transition-transform duration-300',
                isMobileMenuOpen && 'translate-y-1.75 rotate-225'
              )}
            ></span>
            <span
              className={cn(
                'bg-foreground block h-0.75 w-3.5 origin-right rounded-full transition-[translate,scale,opacity] duration-300',
                isMobileMenuOpen && 'translate-x-0 scale-x-0 opacity-0'
              )}
            ></span>
            <span
              className={cn(
                'bg-foreground block h-0.75 w-6 rounded-full transition-transform duration-300',
                isMobileMenuOpen && '-translate-y-1.75 -rotate-225'
              )}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          'bg-background border-border absolute top-full right-0 left-0 overflow-hidden border-t border-b lg:hidden',
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {/* Navigation Links */}
        <div className="mb-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground/80 hover:text-foreground hover:bg-muted p-4 text-lg font-semibold tracking-tighter"
            >
              {link.label}
            </Link>
          ))}

          {/* Bottom Action Bar for Mobile */}
          <div className="flex h-12">
            <Link
              href={ZCAL_LINK}
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'border-border flex flex-1 items-center justify-center border-r text-xl font-bold tracking-widest',
                !mounted
                  ? 'bg-muted text-muted-foreground'
                  : resolvedTheme === 'dark'
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-800'
              )}
            >
              Talk to Us
            </Link>
            <button
              onClick={toggleTheme}
              className="border-border hover:bg-muted flex w-12 items-center justify-center border-y"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="h-6 w-6" />
              ) : resolvedTheme === 'dark' ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
