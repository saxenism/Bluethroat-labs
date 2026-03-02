import { GridBackground } from '../ui/grid-background'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next-export-optimize-images/image'
import RemoteImage from 'next-export-optimize-images/remote-image'
import type { BlogItem } from '@/lib/sanity/reveries'

interface ReveriesSectionProps {
  blogs: BlogItem[]
}

export function ReveriesSection({ blogs }: ReveriesSectionProps) {
  return (
    <GridBackground
      id="reveries"
      className="bg-background border-border border-t border-b py-16"
      withNoise={true}
    >
      <div className="border-border mx-auto max-w-[1300px] border-b">
        {/* Architectural Header */}
        <div className="border-border mb-0 flex h-16 items-stretch border-y bg-zinc-50 dark:bg-zinc-950">
          <div className="flex h-full items-center">
            <div className="border-border flex h-full min-w-[240px] items-center border-r bg-zinc-100 px-12 dark:bg-zinc-900">
              <span className="font-mono text-2xl font-semibold uppercase">
                Reveries
              </span>
            </div>
          </div>
          <div className="relative h-full flex-1 overflow-hidden">
            <Image
              src="/dark-mode/dark-strip.png"
              alt="Decorative strip"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="border-border mt-12 border-t">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.href}
              className="group border-border flex items-stretch border-b transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
            >
              {/* Content Side */}
              <div className="flex flex-1 flex-col items-start p-6 sm:flex-row sm:items-center sm:p-12">
                {/* Thumbnail */}
                <div className="border-border relative mb-4 aspect-video w-full shrink-0 overflow-hidden border bg-zinc-200 sm:mr-8 sm:mb-0 sm:w-48 dark:bg-zinc-800">
                  {blog.src ? (
                    <RemoteImage
                      src={blog.src}
                      alt={blog.title}
                      fill
                      className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{
                        backgroundImage: 'url(/dark-mode/dark-footer.png)',
                      }}
                    />
                  )}
                </div>

                {/* Text content */}
                <div className="flex-1 align-text-top">
                  <h3 className="mb-3 max-w-4xl font-mono text-base leading-snug font-bold transition-transform group-hover:translate-x-1 sm:text-xl">
                    {blog.title}
                  </h3>
                  <div className="text-muted-foreground flex items-center font-mono text-[11px] tracking-widest uppercase">
                    <span className="font-bold">{blog.category}</span>
                    <span className="text-border mx-2 text-lg">•</span>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>

              {/* The "Boxed" Arrow Side */}
              <div className="flex items-start justify-end transition-colors">
                <div className="border-border border-b border-l">
                  <ArrowUpRight className="text-foreground h-16 w-16 stroke-[1.4px] transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <div className="group border-border hover:bg-foreground flex justify-end border-l p-5 px-20 transition-colors">
            <Link
              href="/reveries"
              className="text-foreground group-hover:text-secondary flex items-center justify-center font-mono text-xl font-semibold transition-colors"
            >
              Checkout Reveries
            </Link>
          </div>
        </div>
      </div>
    </GridBackground>
  )
}
