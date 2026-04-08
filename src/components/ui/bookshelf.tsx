'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, CornerUpRightIcon } from 'lucide-react'
import type { WriteupItem } from '@/lib/sanity/writeups'
import { cn } from '@/lib/utils'

const textureStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
  backgroundSize: '150px',
} as const

const findNextIndex = (
  books: Array<WriteupItem & { comingSoon: boolean }>,
  from: number,
  direction: 'prev' | 'next'
) => {
  if (direction === 'prev') {
    for (let i = from - 1; i >= 0; i -= 1) {
      if (!books[i].comingSoon) return i
    }
    return -1
  }

  for (let i = from + 1; i < books.length; i += 1) {
    if (!books[i].comingSoon) return i
  }
  return -1
}

export const BookShelf = ({ writeups }: { writeups: WriteupItem[] }) => {
  const books = useMemo(
    () => [
      ...writeups.map((item) => ({ ...item, comingSoon: !item.coverSrc })),
      {
        title: 'Coming Soon - Stay Tuned',
        description: '',
        href: '#',
        logoSrc: null,
        coverSrc: null,
        comingSoon: true,
      },
    ],
    [writeups]
  )

  const firstInteractive = useMemo(
    () => books.findIndex((book) => !book.comingSoon),
    [books]
  )
  const [activeBookIndex, setActiveBookIndex] = useState(
    firstInteractive === -1 ? 0 : firstInteractive
  )

  useEffect(() => {
    setActiveBookIndex(firstInteractive === -1 ? 0 : firstInteractive)
  }, [firstInteractive])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

      const direction = event.key === 'ArrowLeft' ? 'prev' : 'next'
      const nextIndex = findNextIndex(books, activeBookIndex, direction)
      if (nextIndex !== -1) {
        setActiveBookIndex(nextIndex)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeBookIndex, books])

  if (!books.length) {
    return <p className="text-muted-foreground">No writeups published yet.</p>
  }

  const activeBook = books[activeBookIndex]
  const prevIndex = findNextIndex(books, activeBookIndex, 'prev')
  const nextIndex = findNextIndex(books, activeBookIndex, 'next')

  return (
    <div className="w-full">
      <div className="relative flex min-h-112 items-end justify-center gap-4 overflow-x-auto px-2 pb-8 md:min-h-125 md:gap-10">
        {books.map((book, index) => {
          const isActive = index === activeBookIndex

          return (
            <button
              key={`${book.title}-${index}`}
              type="button"
              onClick={() => !book.comingSoon && setActiveBookIndex(index)}
              disabled={book.comingSoon}
              className={cn(
                'relative z-0 mb-3 shrink-0 text-left transition-[margin] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] select-none perspective-distant',
                isActive && 'z-10 md:mr-73',
                book.comingSoon && 'cursor-default!'
              )}
            >
              <div
                className={cn(
                  'relative flex origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-3d',
                  isActive && !book.comingSoon
                    ? 'rotate-y-[-75deg]'
                    : 'rotate-y-0'
                )}
              >
                <div
                  className={cn(
                    'relative flex h-110 w-15 flex-col items-center justify-between overflow-hidden rounded-l-[3px] px-0 pt-4 pb-2',
                    book.comingSoon && 'justify-center'
                  )}
                >
                  <div className="absolute inset-0 bg-[#292929]" />

                  <div
                    className="font-instrumental relative z-10 max-h-90 truncate text-base whitespace-nowrap text-[#F2F2F2]"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}
                  >
                    {book.title}
                  </div>

                  {!!book.logoSrc && (
                    <div className="relative z-10 h-11 w-11">
                      <Image
                        src={book.logoSrc}
                        alt={`${book.title} logo`}
                        width={44}
                        height={44}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    </div>
                  )}

                  <div
                    className="pointer-events-none absolute inset-0 z-20 opacity-40"
                    style={textureStyle}
                  />
                </div>

                {!book.comingSoon && book.coverSrc && (
                  <Link
                    href={book.href}
                    className="absolute top-0 left-14 block h-111 w-92 origin-left rotate-y-90 overflow-hidden rounded-r-lg backface-hidden"
                  >
                    <Image
                      src={book.coverSrc}
                      alt={book.title}
                      width={367}
                      height={444}
                      className="h-full w-full object-cover select-none"
                    />

                    <div className="relative">
                      <div className="absolute right-0 bottom-0 left-0 w-full p-6 pb-8">
                        <p className="font-instrumental mb-4 text-2xl">
                          {book.title}
                        </p>
                        {!!book.description && (
                          <div className="**:mb-0 **:font-mono **:text-xs **:font-semibold **:text-[#E6E6E6]">
                            {book.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </button>
          )
        })}

        <div className="pointer-events-none absolute right-6 bottom-6 left-6 -z-1 h-7">
          <div
            className="h-full w-full bg-[#2E2E2E]"
            style={{ clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' }}
          />
        </div>
      </div>

      <div className="mt-6 flex w-full items-center justify-between gap-4">
        <button
          type="button"
          disabled={prevIndex === -1}
          onClick={() => prevIndex !== -1 && setActiveBookIndex(prevIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label="Previous writeup"
        >
          <ChevronLeft className="size-7" />
        </button>

        <Link
          href={activeBook.href}
          className="font-instrumental text-center text-2xl text-pretty text-[#8F8F8F] italic hover:text-[#292929] sm:text-[32px] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
        >
          Read the full Writeup{' '}
          <CornerUpRightIcon className="mr-1 ml-1 inline-block size-5 stroke-1 sm:size-6" />
        </Link>

        <button
          type="button"
          disabled={nextIndex === -1}
          onClick={() => nextIndex !== -1 && setActiveBookIndex(nextIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label="Next writeup"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>
    </div>
  )
}
