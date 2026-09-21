'use client'

import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, CornerUpRightIcon } from 'lucide-react'
import type { WriteupItem, WriteupSeriesItem } from '@/lib/sanity/writeups'
import { cn } from '@/lib/utils'

const textureStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
  backgroundSize: '150px',
} as const

const findNextIndex = (
  bookCount: number,
  from: number,
  direction: 'prev' | 'next'
) => {
  const nextIndex = direction === 'prev' ? from - 1 : from + 1

  return nextIndex >= 0 && nextIndex < bookCount ? nextIndex : -1
}

const DESKTOP_BOOKS_PER_SHELF = 6

const getDesktopShelfPage = (bookIndex: number) =>
  Math.floor(bookIndex / DESKTOP_BOOKS_PER_SHELF)

/* ── Mobile book scale (change this one number to resize) ── */
const MOBILE_SCALE = 0.7 // 1.0 = same as desktop (440×60 spine, 444×368 cover)
const mb = {
  h: Math.round(440 * MOBILE_SCALE),
  sw: Math.round(60 * MOBILE_SCALE),
  cw: Math.round(368 * MOBILE_SCALE),
  maxText: Math.round(360 * MOBILE_SCALE),
  logo: Math.round(44 * MOBILE_SCALE),
}

const isNestedInteractiveTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  !!target.closest('a, button, input, select, textarea, summary')

type ShelfItem = Pick<
  WriteupItem,
  'id' | 'title' | 'description' | 'logoSrc' | 'coverSrc'
> & { writeupCount?: number }

const BookSpine = ({ book, mobile }: { book: ShelfItem; mobile?: boolean }) => (
  <div
    className={cn(
      'relative flex flex-col items-center justify-between overflow-hidden rounded-l-[3px] px-0 pt-4 pb-2',
      !mobile && 'h-111 w-15'
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

const BookCover = ({
  book,
  mobile,
  actionLabel,
  onActivate,
  role,
}: {
  book: ShelfItem
  mobile?: boolean
  actionLabel: string
  onActivate: () => void
  role: 'button' | 'link'
}) => {
  if (!book.coverSrc) return null

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isNestedInteractiveTarget(event.target)) return
    onActivate()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    onActivate()
  }

  return (
    <div
      role={role}
      tabIndex={0}
      aria-label={actionLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'absolute top-0 origin-left rotate-y-90 cursor-pointer overflow-hidden rounded-r-lg backface-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D7D7D]',
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
              'font-instrumental text-[#F2F2F2]',
              book.writeupCount === undefined && 'mb-4',
              mobile ? 'text-lg' : 'text-2xl'
            )}
          >
            {book.title}
          </p>
          {book.writeupCount !== undefined && (
            <p
              className={cn(
                'mb-2 font-mono font-semibold tracking-[0.16em] text-[#E6E6E6] uppercase',
                mobile ? 'mt-0.5 text-[9px]' : 'mt-1 text-[11px]'
              )}
            >
              {book.writeupCount}{' '}
              {`writeup${book.writeupCount === 1 ? '' : 's'}`}
            </p>
          )}
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
const BookVisual = ({
  book,
  mobile,
  actionLabel,
  onActivate,
  role,
}: {
  book: ShelfItem
  mobile?: boolean
  actionLabel: string
  onActivate: () => void
  role: 'button' | 'link'
}) => (
  <>
    <BookSpine book={book} mobile={mobile} />
    <BookCover
      book={book}
      mobile={mobile}
      actionLabel={actionLabel}
      onActivate={onActivate}
      role={role}
    />
  </>
)

export const BookShelf = ({
  writeups,
  writeupSeries,
}: {
  writeups: WriteupItem[]
  writeupSeries: WriteupSeriesItem[]
}) => {
  const hasSeriesChooser = writeupSeries.length > 1
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(() =>
    writeupSeries.length === 1 ? (writeupSeries[0]?.id ?? null) : null
  )
  const isSeriesShelf = selectedSeriesId === null
  const selectedSeriesIndex = writeupSeries.findIndex(
    (series) => series.id === selectedSeriesId
  )
  const selectedSeries = writeupSeries[selectedSeriesIndex]
  const seriesWriteups = useMemo(
    () =>
      selectedSeriesId
        ? writeups.filter((item) => item.series?.id === selectedSeriesId)
        : [],
    [selectedSeriesId, writeups]
  )
  const seriesBooks = useMemo<ShelfItem[]>(
    () =>
      writeupSeries.map((series) => ({
        ...series,
        writeupCount: writeups.filter(
          (writeup) => writeup.series?.id === series.id
        ).length,
      })),
    [writeupSeries, writeups]
  )
  const books: ShelfItem[] = isSeriesShelf ? seriesBooks : seriesWriteups

  const [activeBookIndex, setActiveBookIndex] = useState(0)
  const [desktopPageDirection, setDesktopPageDirection] = useState<
    'prev' | 'next' | null
  >(null)

  /* Mobile carousel state */
  const [mobileDisplayIndex, setMobileDisplayIndex] = useState(activeBookIndex)
  const [mobileAnim, setMobileAnim] = useState<
    'idle' | 'exit-left' | 'exit-right' | 'enter-left' | 'enter-right'
  >('idle')
  const pendingRef = useRef(activeBookIndex)

  const showSeriesShelf = useCallback(() => {
    const seriesIndex = Math.max(selectedSeriesIndex, 0)

    setActiveBookIndex(seriesIndex)
    setMobileDisplayIndex(seriesIndex)
    setMobileAnim('idle')
    pendingRef.current = seriesIndex
    setDesktopPageDirection(null)
    setSelectedSeriesId(null)
  }, [selectedSeriesIndex])

  const activateBook = useCallback(
    (index: number) => {
      if (isSeriesShelf) {
        const series = writeupSeries[index]
        if (!series) return

        setActiveBookIndex(0)
        setMobileDisplayIndex(0)
        setMobileAnim('idle')
        pendingRef.current = 0
        setDesktopPageDirection(null)
        setSelectedSeriesId(series.id)
        return
      }

      const writeup = seriesWriteups[index]
      if (!writeup) return

      window.open(writeup.href, '_blank', 'noopener,noreferrer')
    },
    [isSeriesShelf, seriesWriteups, writeupSeries]
  )

  const navigate = useCallback(
    (direction: 'prev' | 'next', toIndex: number) => {
      if (mobileAnim !== 'idle') return
      pendingRef.current = toIndex

      if (
        getDesktopShelfPage(toIndex) !== getDesktopShelfPage(activeBookIndex)
      ) {
        setDesktopPageDirection(direction)
      }

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
    [activeBookIndex, mobileAnim]
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
      const idx = findNextIndex(books.length, activeBookIndex, direction)
      if (idx !== -1) navigate(direction, idx)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeBookIndex, books, mobileAnim, navigate])

  const seriesHeader = selectedSeries ? (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-center px-14">
      {hasSeriesChooser && (
        <button
          type="button"
          onClick={showSeriesShelf}
          className="pointer-events-auto absolute top-0 left-0 border-r border-b p-2.75 text-[#A9A9A9] hover:bg-[#E6E6E6] hover:dark:bg-[#292929]"
          aria-label="Back to all writeup series"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      <h2 className="font-instrumental max-w-full truncate pt-8 text-center text-xl text-[#454545] sm:text-2xl dark:text-[#A9A9A9]">
        {selectedSeries.title}
      </h2>
    </div>
  ) : null

  if (!books.length) {
    return (
      <div>
        {seriesHeader}
        <div className="flex min-h-64 items-center justify-center text-center">
          <p className="text-muted-foreground">
            {isSeriesShelf
              ? 'No writeup series published yet.'
              : 'No writeups published in this series yet.'}
          </p>
        </div>
      </div>
    )
  }

  const prevIndex = findNextIndex(books.length, activeBookIndex, 'prev')
  const nextIndex = findNextIndex(books.length, activeBookIndex, 'next')
  const isNavigating = mobileAnim !== 'idle'
  const mobileBook = books[mobileDisplayIndex]
  const desktopShelfPage = getDesktopShelfPage(activeBookIndex)
  const desktopPageStart = desktopShelfPage * DESKTOP_BOOKS_PER_SHELF
  const desktopBooks = books.slice(
    desktopPageStart,
    desktopPageStart + DESKTOP_BOOKS_PER_SHELF
  )
  const desktopPageEnd = Math.min(
    desktopPageStart + DESKTOP_BOOKS_PER_SHELF,
    books.length
  )
  const previousDesktopPageStart =
    desktopShelfPage > 0 ? desktopPageStart - DESKTOP_BOOKS_PER_SHELF : -1
  const nextDesktopPageStart =
    desktopPageEnd < books.length ? desktopPageEnd : -1
  const activeWriteup = isSeriesShelf ? null : seriesWriteups[activeBookIndex]
  const footerHref =
    activeWriteup?.href ?? '/reveries?cat=Vulnerability+Writeup'
  const footerLabel = isSeriesShelf
    ? 'View All Writeups'
    : 'Read the full Writeup'
  const mobileActionLabel = isSeriesShelf
    ? `Open the ${mobileBook.title} series`
    : `Read the full writeup for ${mobileBook.title}`
  const activeRole = isSeriesShelf ? 'button' : 'link'
  const bookType = isSeriesShelf ? 'series' : 'writeup'
  const previousBook = prevIndex !== -1 ? books[prevIndex] : null
  const nextBook = nextIndex !== -1 ? books[nextIndex] : null

  return (
    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
      {seriesHeader}

      {/* ── Desktop ── */}
      <div className="relative hidden lg:block">
        <div
          key={`${selectedSeriesId ?? 'series'}-${desktopShelfPage}`}
          className={cn(
            'relative flex min-h-125 items-end justify-center gap-10 overflow-hidden px-2 pb-8',
            desktopPageDirection === 'next' && 'animate-shelf-enter-next',
            desktopPageDirection === 'prev' && 'animate-shelf-enter-prev'
          )}
        >
          {desktopBooks.map((book, index) => {
            const globalIndex = desktopPageStart + index
            const isActive = globalIndex === activeBookIndex

            return (
              <div
                key={book.id}
                className={cn(
                  'relative z-0 mb-3 shrink-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] select-none perspective-distant',
                  isActive && 'z-10 mr-73'
                )}
              >
                <div
                  className={cn(
                    'relative flex origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-3d',
                    isActive ? 'rotate-y-[-75deg]' : 'rotate-y-0'
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        globalIndex > activeBookIndex ? 'next' : 'prev',
                        globalIndex
                      )
                    }
                    aria-label={
                      isActive
                        ? `${book.title} is selected`
                        : `Select ${book.title}`
                    }
                    className="relative block shrink-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D7D7D]"
                  >
                    <BookSpine book={book} />
                  </button>
                  <BookCover
                    book={book}
                    actionLabel={
                      isSeriesShelf
                        ? `Open the ${book.title} series`
                        : `Read the full writeup for ${book.title}`
                    }
                    onActivate={() => activateBook(globalIndex)}
                    role={isSeriesShelf ? 'button' : 'link'}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute right-6 bottom-6 left-6 -z-1 h-7 lg:right-0 lg:left-0 xl:right-6 xl:left-6">
          <div
            className="h-full w-full bg-[#A9A9A9] dark:bg-[#2E2E2E]"
            style={{ clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' }}
          />
        </div>

        {previousDesktopPageStart !== -1 && (
          <button
            type="button"
            onClick={() => navigate('prev', previousDesktopPageStart)}
            aria-label={`Show previous shelf, books ${previousDesktopPageStart + 1} through ${desktopPageStart}`}
            className="absolute bottom-0 left-0 z-20 flex min-h-10 items-center gap-2 border border-[#555555] bg-[#D3D3D3] px-3 font-mono text-[11px] font-semibold tracking-widest text-[#454545] uppercase transition-colors hover:bg-[#E6E6E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D7D7D] dark:bg-[#242424] dark:text-[#BDBDBD] dark:hover:bg-[#303030]"
          >
            <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
            <span>Previous shelf</span>
          </button>
        )}

        {nextDesktopPageStart !== -1 && (
          <button
            type="button"
            onClick={() => navigate('next', nextDesktopPageStart)}
            aria-label={`Show next shelf, books ${nextDesktopPageStart + 1} through ${Math.min(nextDesktopPageStart + DESKTOP_BOOKS_PER_SHELF, books.length)}`}
            className="absolute right-0 bottom-0 z-20 flex min-h-10 items-center gap-2 border border-[#555555] bg-[#D3D3D3] px-3 font-mono text-[11px] font-semibold tracking-widest text-[#454545] uppercase transition-colors hover:bg-[#E6E6E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D7D7D] dark:bg-[#242424] dark:text-[#BDBDBD] dark:hover:bg-[#303030]"
          >
            <span>Next shelf</span>
            <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Mobile Carousel ── */}
      <div className="relative block w-full lg:hidden">
        <div className="relative flex min-h-95 items-end justify-center overflow-hidden px-4 pt-4 pb-8">
          <div
            key={mobileBook.id}
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
            <div className="relative mb-4 flex origin-left rotate-y-[-75deg] transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-3d">
              <BookVisual
                book={mobileBook}
                mobile
                actionLabel={mobileActionLabel}
                onActivate={() => activateBook(mobileDisplayIndex)}
                role={activeRole}
              />
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
          href={footerHref}
          target={activeWriteup ? '_blank' : undefined}
          rel={activeWriteup ? 'noopener noreferrer' : undefined}
          className="font-instrumental text-center text-2xl text-pretty text-[#8F8F8F] italic hover:text-[#292929] sm:text-[32px] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
        >
          {footerLabel}{' '}
          <CornerUpRightIcon className="mr-1 ml-1 inline-block size-5 stroke-1 sm:size-6" />
        </Link>
      </div>

      {/* ── Navigation ── */}
      <div className="mt-6 flex w-full items-center justify-between gap-4">
        <button
          type="button"
          disabled={prevIndex === -1 || isNavigating}
          onClick={() => prevIndex !== -1 && navigate('prev', prevIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D7D7D] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label={
            previousBook
              ? `Previous ${bookType}, ${prevIndex + 1} of ${books.length}: ${previousBook.title}`
              : `No previous ${bookType}`
          }
        >
          <ChevronLeft className="size-7" aria-hidden="true" />
        </button>

        <Link
          href={footerHref}
          target={activeWriteup ? '_blank' : undefined}
          rel={activeWriteup ? 'noopener noreferrer' : undefined}
          className="font-instrumental text-center text-2xl text-pretty text-[#8F8F8F] italic hover:text-[#292929] max-lg:hidden sm:text-[32px] dark:text-[#7D7D7D] hover:dark:text-[#E6E6E6]"
        >
          {footerLabel}{' '}
          <CornerUpRightIcon className="mr-1 ml-1 inline-block size-5 stroke-1 sm:size-6" />
        </Link>

        <button
          type="button"
          disabled={nextIndex === -1 || isNavigating}
          onClick={() => nextIndex !== -1 && navigate('next', nextIndex)}
          className="border-border border p-2 text-[#A9A9A9] hover:bg-[#E6E6E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D7D7D] disabled:opacity-35 dark:hover:bg-[#292929]"
          aria-label={
            nextBook
              ? `Next ${bookType}, ${nextIndex + 1} of ${books.length}: ${nextBook.title}`
              : `No next ${bookType}`
          }
        >
          <ChevronRight className="size-7" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
