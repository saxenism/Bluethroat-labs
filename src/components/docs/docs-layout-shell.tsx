'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { DocsNavbar } from '@/components/docs/docs-navbar'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { DocsFooter } from '@/components/docs/docs-footer'
import { DocsTocProvider } from '@/components/docs/docs-toc-context'
import type { MarkdownHeading } from '@/lib/markdown-headings'
import type {
  BreadcrumbItem,
  NavItem,
  SearchableDoc,
} from '@/lib/sanity/docs-nav'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'

interface DocsLayoutShellProps {
  children: ReactNode
  subSections: MarkdownHeading[]
  breadcrumbItems: BreadcrumbItem[]
  navigation: NavItem[]
  searchableDocs: SearchableDoc[]
  version?: string
  prev?: NavItem | null
  next?: NavItem | null
}

export function DocsLayoutShell({
  children,
  subSections,
  breadcrumbItems,
  navigation,
  searchableDocs,
  version,
  prev,
  next,
}: DocsLayoutShellProps) {
  const [isContentsOpen, setIsContentsOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')

    if (isMobileSidebarOpen && !mq.matches) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.style.overflow = ''
        setIsMobileSidebarOpen(false)
      }
    }

    mq.addEventListener('change', handleResize)
    return () => {
      document.body.style.overflow = ''
      mq.removeEventListener('change', handleResize)
    }
  }, [isMobileSidebarOpen])

  useEffect(() => {
    if (!subSections?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-100px 0px -66% 0px' }
    )

    const sections = subSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [subSections])

  return (
    <DocsTocProvider subSections={subSections} activeSection={activeSection}>
      <DocsNavbar version={version} />

      <div className="flex flex-1">
        <div className="max-lg:hidden">
          <DocsSidebar
            navigation={navigation}
            searchableDocs={searchableDocs}
          />
        </div>

        <div
          className={cn(
            'border-border min-w-0 border-r',
            isContentsOpen ? '' : 'lg:mr-18'
          )}
        >
          <div className="border-border bg-background sticky top-12 z-10 w-full border-b lg:top-18">
            <DocsBreadcrumb
              items={breadcrumbItems}
              isOpen={isContentsOpen}
              isMobileMenuOpen={isMobileSidebarOpen}
              hasToc={subSections.length > 0}
              onToggleContents={() => setIsContentsOpen((prev) => !prev)}
              onToggleMobileMenu={() => setIsMobileSidebarOpen((prev) => !prev)}
            />
            <div
              className={cn(
                'bg-background border-border absolute top-full right-0 left-0 overflow-y-auto border-t border-b lg:hidden',
                isMobileSidebarOpen ? 'max-h-[calc(100vh-144px)]' : 'max-h-0'
              )}
            >
              <DocsSidebar
                navigation={navigation}
                searchableDocs={searchableDocs}
                onNavigate={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>

          <main className="overflow-y-auto">
            <div className="w-full">{children}</div>

            {(prev || next) && (
              <nav className="container mx-auto grid grid-cols-1 gap-3 px-4 md:grid-cols-2 md:px-8">
                <div className="">
                  {!!prev?.slug && (
                    <Link
                      href={`/docs/${prev.slug}`}
                      className="border-border flex h-full flex-col gap-4 border p-6 hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
                    >
                      <span className="flex items-center gap-2 text-lg font-semibold text-[#292929] md:text-xl dark:text-[#A9A9A9]">
                        <ArrowLeftIcon /> Previous
                      </span>
                      <p className="text-foreground text-lg font-semibold md:text-2xl">
                        {prev.title}
                      </p>
                    </Link>
                  )}
                </div>

                <div>
                  {!!next?.slug && (
                    <Link
                      href={`/docs/${next.slug}`}
                      className="border-border flex h-full flex-col items-end gap-4 border p-6 text-right hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
                    >
                      <span className="flex items-center gap-2 text-lg font-semibold text-[#292929] md:text-xl dark:text-[#A9A9A9]">
                        Next <ArrowRightIcon />
                      </span>
                      <p className="text-foreground text-lg font-semibold md:text-2xl">
                        {next.title}
                      </p>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            <DocsFooter />
          </main>
        </div>

        {isContentsOpen && (
          <aside className="sticky top-18 hidden h-[calc(100vh-72px)] min-w-75 overflow-y-auto px-6 py-4 lg:block">
            <div className="group mb-8 flex cursor-default items-center gap-2">
              <div className="bg-border group-hover:bg-foreground h-6 w-1.5" />
              <h3 className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                Contents
              </h3>
            </div>
            <nav className="space-y-4">
              <ul className="relative ml-0.5 space-y-6 pl-0">
                {subSections.map((section) => {
                  const isActive = activeSection === section.id
                  const isSubHeading = section.style === 'h3'
                  return (
                    <li
                      key={section.id}
                      className={cn('relative', isSubHeading ? 'pl-8' : 'pl-5')}
                    >
                      {isActive && (
                        <div className="bg-foreground absolute top-0 bottom-0 left-[-2px] w-[3px] rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
                      )}
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          'hover:text-foreground block text-[13px] leading-snug',
                          isActive
                            ? 'text-foreground translate-x-1 font-bold italic'
                            : 'text-muted-foreground'
                        )}
                      >
                        {section.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </DocsTocProvider>
  )
}
