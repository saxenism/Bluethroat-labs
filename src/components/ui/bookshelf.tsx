'use client'

import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, CornerUpRightIcon } from 'lucide-react'
import type { WriteupItem } from '@/lib/sanity/writeups'
import { cn } from '@/lib/utils'

const textureStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
  backgroundSize: '150px',
} as const

type BookItem = WriteupItem & { comingSoon: boolean }

const findNextIndex = (
  books: BookItem[],
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

/* ── Mobile book scale (change this one number to resize) ── */
const MOBILE_SCALE = 0.7 // 1.0 = same as desktop (440×60 spine, 444×368 cover)
const mb = {
  h: Math.round(440 * MOBILE_SCALE),
  sw: Math.round(60 * MOBILE_SCALE),
  cw: Math.round(368 * MOBILE_SCALE),
  maxText: Math.round(360 * MOBILE_SCALE),
  logo: Math.round(44 * MOBILE_SCALE),
}

const isInternalHref = (href: string) =>
  href.startsWith('/') || href.startsWith('#')

const isNestedInteractiveTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  !!target.closest('a, button, input, select, textarea, summary')

const BookSpine = ({ book, mobile }: { book: BookItem; mobile?: boolean }) => (
  <div
    className={cn(
      'relative flex flex-col items-center justify-between overflow-hidden rounded-l-[3px] px-0 pt-4 pb-2',
      !mobile && 'h-110 w-15',
      book.comingSoon && 'justify-center'
    )}
    style={mobile ? { height: mb.h, width: mb.sw } : undefined}
  >
    <div className="absolute inset-0 bg-[#292929]" />
    <div
      className={cn(
        'font-instrumental relative z-10 truncate whitespace-nowrap text-[#F2F2F2]',
        mobile ? 'text-xs' : 'max-h-90 text-base'
      )}
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        ...(mobile ? { maxHeight: mb.maxText } : {}),
      }}
    >
      {book.title}
    </div>
    {!!book.logoSrc && (
      <div
        className={cn('relative z-10', !mobile && 'h-11 w-11')}
        style={mobile ? { height: mb.logo, width: mb.logo } : undefined}
      >
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
)

const BookCover = ({ book, mobile }: { book: BookItem; mobile?: boolean }) => {
  const router = useRouter()

  if (book.comingSoon || !book.coverSrc) return null

  const navigateToBook = () => {
    if (isInternalHref(book.href)) {
      router.push(book.href)
      return
    }

    window.location.assign(book.href)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isNestedInteractiveTarget(event.target)) return
    navigateToBook()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    navigateToBook()
  }

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`Read the full writeup for ${book.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'absolute top-0 origin-left rotate-y-90 overflow-hidden rounded-r-lg backface-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D7D7D]',
        !mobile && 'left-14 h-111 w-92'
      )}
      style={mobile ? { left: mb.sw, height: mb.h, width: mb.cw } : undefined}
    >
      <Image
        src={book.coverSrc}
        alt={book.title}
        width={367}
        height={444}
        className="h-full w-full object-cover select-none"
      />
      <div className="absolute inset-x-0 bottom-0 z-20 w-full">
        <div className={cn(mobile ? 'p-4 pb-5' : 'p-6 pb-8')}>
          <p
            className={cn(
              'font-instrumental mb-4 text-[#F2F2F2]',
              mobile ? 'text-lg' : 'text-2xl'
            )}
          >
            {book.title}
          </p>
          {!!book.description && (
            <div
              className={cn(
                '**:mb-0 **:font-mono **:font-semibold **:text-[#E6E6E6] hover:**:text-[#E6E6E6] [&_a]:relative [&_a]:z-10',
                mobile ? '**:text-[10px]' : '**:text-xs'
              )}
            >
              {book.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Shared book spine + cover markup ── */
const BookVisual = ({ book, mobile }: { book: BookItem; mobile?: boolean }) => (
  <>
    <BookSpine book={book} mobile={mobile} />
    <BookCover book={book} mobile={mobile} />
  </>
)

export const BookShelf = ({ writeups }: { writeups: WriteupItem[] }) => {
  const books = useMemo(() => {
    const mapped = writeups
      .slice(0, 6)
      .map((item) => ({ ...item, comingSoon: !item.coverSrc }))

    if (mapped.length < 6) {
      mapped.push({
        title: 'Coming Soon - Stay Tuned',
        description: '',
        href: '#',
        logoSrc: null,
        coverSrc: null,
        series: null,
        comingSoon: true,
      })
    }

    return mapped
  }, [writeups])

  const firstInteractive = useMemo(
    () => books.findIndex((book) => !book.comingSoon),
    [books]
  )

  const [activeBookIndex, setActiveBookIndex] = useState(
    firstInteractive === -1 ? 0 : firstInteractive
  )

  /* Mobile carousel state */
  const [mobileDisplayIndex, setMobileDisplayIndex] = useState(activeBookIndex)
  const [mobileAnim, setMobileAnim] = useState<
    'idle' | 'exit-left' | 'exit-right' | 'enter-left' | 'enter-right'
  >('idle')
  const pendingRef = useRef(activeBookIndex)

  useEffect(() => {
    const idx = firstInteractive === -1 ? 0 : firstInteractive
    setActiveBookIndex(idx)
    setMobileDisplayIndex(idx)
  }, [firstInteractive])

  const navigate = useCallback(
    (direction: 'prev' | 'next', toIndex: number) => {
      if (mobileAnim !== 'idle') return
      pendingRef.current = toIndex

      // Desktop: instant state change (CSS transition handles animation)
      setActiveBookIndex(toIndex)

      // Mobile: trigger exit animation (only if mobile is visible)
      const isMobile = window.matchMedia('(max-width: 1023px)').matches
      if (isMobile) {
        setMobileAnim(direction === 'next' ? 'exit-left' : 'exit-right')
      } else {
        // On desktop, also sync mobile display index immediately
        setMobileDisplayIndex(toIndex)
      }
    },
    [mobileAnim]
  )

  const onMobileAnimEnd = useCallback(() => {
    if (mobileAnim === 'exit-left' || mobileAnim === 'exit-right') {
      // Swap to new book, start enter animation
      setMobileDisplayIndex(pendingRef.current)
      setMobileAnim(mobileAnim === 'exit-left' ? 'enter-right' : 'enter-left')
    } else {
      // Enter done
      setMobileAnim('idle')
    }
  }, [mobileAnim])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (mobileAnim !== 'idle') return

      const direction = event.key === 'ArrowLeft' ? 'prev' : 'next'
      const idx = findNextIndex(books, activeBookIndex, direction)
      if (idx !== -1) navigate(direction, idx)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeBookIndex, books, mobileAnim, navigate])

  if (!books.length) {
    return <p className="text-muted-foreground">No writeups published yet.</p>
  }

  const activeBook = books[activeBookIndex]
  const prevIndex = findNextIndex(books, activeBookIndex, 'prev')
  const nextIndex = findNextIndex(books, activeBookIndex, 'next')
  const isNavigating = mobileAnim !== 'idle'
  const mobileBook = books[mobileDisplayIndex]

  return (
    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
      {/* ── Desktop ── */}
      <div className="relative hidden lg:block">
        <div className="relative flex min-h-125 items-end justify-center gap-10 overflow-x-auto px-2 pb-8">
          {books.map((book, index) => {
            const isActive = index === activeBookIndex
            return (
              <div
                key={`desk-${index}`}
                className={cn(
                  'relative z-0 mb-3 shrink-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] select-none perspective-distant',
                  isActive && 'z-10 mr-73',
                  book.comingSoon && 'cursor-default'
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
                  <button
                    type="button"
                    onClick={() =>
                      !book.comingSoon &&
                      navigate(index > activeBookIndex ? 'next' : 'prev', index)
                    }
                    disabled={book.comingSoon}
                    aria-label={
                      isActive
                        ? `${book.title} is selected`
                        : `Select ${book.title}`
                    }
                    className={cn(
                      'relative block shrink-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D7D7D]',
                      book.comingSoon && 'cursor-default'
                    )}
                  >
                    <BookSpine book={book} />
                  </button>
                  <BookCover book={book} />
                </div>
              </div>
            )
          })}

          <div className="pointer-events-none absolute right-6 bottom-6 left-6 -z-1 h-7 lg:right-0 lg:left-0 xl:right-6 xl:left-6">
            <div
              className="h-full w-full bg-[#A9A9A9] dark:bg-[#2E2E2E]"
              style={{ clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Carousel ── */}
      <div className="relative block w-full lg:hidden">
        <div className="relative flex min-h-95 items-end justify-center overflow-hidden px-4 pt-4 pb-8">
          <div
            className={cn(
              'perspective-distant',
              mobileAnim === 'exit-left' && 'animate-book-exit-left',
              mobileAnim === 'exit-right' && 'animate-book-exit-right',
              mobileAnim === 'enter-left' && 'animate-book-enter-left',
              mobileAnim === 'enter-right' && 'animate-book-enter-right'
            )}
            style={{ marginLeft: -(mb.cw - mb.sw) }}
            onAnimationEnd={onMobileAnimEnd}
          >
            <div
              className={cn(
                'relative mb-4 flex origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-3d',
                !mobileBook.comingSoon && 'rotate-y-[-75deg]'
              )}
            >
              <BookVisual book={mobileBook} mobile />
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 left-0 -z-1 h-7 xl:right-6 xl:left-6">
            <div
              className="h-full w-full bg-[#A9A9A9] dark:bg-[#2E2E2E]"
              style={{ clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' }}
            />
          </div>
        </div>
      </div>

      <div className="text-center lg:hidden">
        <Link
          href={activeBook.href}
          className="font-instrumental text-center text-2xl text-pretty text-[#8F8F8F] italic hover:text-[#292929] sm:text-[32px] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
        >
          Read the full Writeup{' '}
          <CornerUpRightIcon className="mr-1 ml-1 inline-block size-5 stroke-1 sm:size-6" />
        </Link>
      </div>

      {/* ── Navigation ── */}
      <div className="mt-6 flex w-full items-center justify-between gap-4">
        <button
          type="button"
          disabled={prevIndex === -1 || isNavigating}
          onClick={() => prevIndex !== -1 && navigate('prev', prevIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label="Previous writeup"
        >
          <ChevronLeft className="size-7" />
        </button>

        <Link
          href={activeBook.href}
          className="font-instrumental text-center text-2xl text-pretty text-[#8F8F8F] italic hover:text-[#292929] max-lg:hidden sm:text-[32px] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
        >
          Read the full Writeup{' '}
          <CornerUpRightIcon className="mr-1 ml-1 inline-block size-5 stroke-1 sm:size-6" />
        </Link>

        <button
          type="button"
          disabled={nextIndex === -1 || isNavigating}
          onClick={() => nextIndex !== -1 && navigate('next', nextIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label="Next writeup"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>
    </div>
  )
}
