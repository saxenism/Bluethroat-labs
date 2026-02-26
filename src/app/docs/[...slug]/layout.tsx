'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { DocsNavbar } from '@/components/docs/docs-navbar'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { DocsFooter } from '@/components/docs/docs-footer'
import { client } from '@/lib/sanity/client'
import { cn } from '@/lib/utils'

interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{ text: string }>
}

interface SubSection {
  id: string
  title: string
  style: string
}

interface DocPageData {
  title: string
  content?: PortableTextBlock[]
  subSections: SubSection[]
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const params = useParams()
  const slugArray = (params.slug as string[]) || []
  const currentSlug = slugArray.join('/') || ''
  const [pageData, setPageData] = useState<DocPageData | null>(null)
  const [isContentsOpen, setIsContentsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const fetchDoc = async () => {
      const query = `*[_type == "doc" && slug.current == $slug][0] {
                title,
                content
            }`
      const data = await client.fetch(query, { slug: currentSlug })
      if (data) {
        // Extract headings from Portable Text
        const headings: SubSection[] =
          data.content
            ?.filter(
              (block: PortableTextBlock) =>
                block._type === 'block' && /^h[1-6]$/.test(block.style ?? '')
            )
            .map((block: PortableTextBlock) => ({
              id: block._key,
              title: block.children?.map((c) => c.text).join('') || 'Untitled',
              style: block.style ?? '',
            })) || []

        setPageData({ ...data, subSections: headings })
      }
    }
    fetchDoc()
  }, [currentSlug])

  useEffect(() => {
    if (!pageData?.subSections) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-100px 0px -66% 0px' }
    )

    const sections = pageData.subSections
      ?.map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    sections?.forEach((section) => observer.observe(section))
    return () => sections?.forEach((section) => observer.unobserve(section))
  }, [pageData])

  const breadcrumbPaths = [
    'HOME',
    ...slugArray.map((s) => s.replace(/-/g, ' ').toUpperCase()),
  ]

  return (
    <div className="bg-background text-foreground selection:bg-foreground selection:text-background flex h-screen flex-col overflow-hidden leading-relaxed">
      {/* Navbar */}
      <DocsNavbar />

      <div className="flex flex-1 overflow-hidden pt-16">
        {/* 1. Left Sidebar */}
        <DocsSidebar />

        {/* 2. Middle Column */}
        <div className="bg-background border-border mr-15 flex min-w-0 flex-1 flex-col border-r">
          {/* FIXED BREADCRUMB SECTION */}
          <div className="bg-background border-border w-full flex-none border-b">
            <DocsBreadcrumb
              paths={breadcrumbPaths}
              isOpen={isContentsOpen}
              onToggleContents={() => setIsContentsOpen(!isContentsOpen)}
            />
          </div>

          {/* SCROLLABLE BODY SECTION */}
          <main className="flex-1 overflow-y-auto">
            <div className="w-full">{children}</div>
            <DocsFooter />
          </main>
        </div>

        {/* 3. Right Column - Contents Sidebar */}
        {isContentsOpen && (
          <aside className="bg-background hidden w-54 -translate-x-8 overflow-y-auto py-8 transition-all duration-300 lg:block">
            <div className="group mb-8 flex cursor-default items-center gap-2">
              <div className="bg-border group-hover:bg-foreground h-6 w-1.5 transition-colors" />
              <h3 className="text-muted-foreground font-mono text-[11px] tracking-[0.2em] uppercase">
                Contents
              </h3>
            </div>
            <nav className="space-y-4">
              <ul className="border-border/50 relative ml-0.5 space-y-6 border-l pl-0">
                {pageData?.subSections?.map((section) => {
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
                          'hover:text-foreground block font-mono text-[13px] leading-snug transition-all duration-300',
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
    </div>
  )
}
