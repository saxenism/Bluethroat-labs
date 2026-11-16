'use client'

import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import type { Announcement } from '@/lib/sanity/announcements'
import { cn } from '@/lib/utils'
import { FindingLogo } from '@/components/sections/finding-logo'
import { ANNOUNCEMENT_DISMISSED_KEY } from '@/lib/announcement-session'

const ROTATION_INTERVAL = 5000
const SCAN_DURATION = 1600

const cellClassName =
  'flex min-w-0 items-center justify-center border-r border-(--strip-line)'
const arrowClassName =
  'size-3.5 shrink-0 transition-transform duration-250 ease-[cubic-bezier(.3,0,.2,1)] group-hover/announcement:translate-x-0.5 group-hover/announcement:-translate-y-0.5'
const textHoverClassName =
  'group-hover/announcement:underline group-hover/announcement:decoration-[color-mix(in_srgb,var(--strip-fg)_45%,transparent)] group-hover/announcement:decoration-1 group-hover/announcement:underline-offset-4'

function AnnouncementItem({
  announcement,
  scanning = false,
}: {
  announcement: Announcement
  scanning?: boolean
}) {
  const lastSpace = announcement.mobileText.lastIndexOf(' ')
  const Item = announcement.href ? 'a' : 'div'
  const hasAction = Boolean(announcement.href && announcement.cta)

  return (
    <div
      className={cn(
        'absolute inset-0 bg-(--strip-bg)',
        scanning &&
          'animate-[announcement-content-in_var(--scan-duration)_cubic-bezier(.37,0,.63,1)_both] will-change-transform'
      )}
    >
      <div className="relative container mx-auto h-full border-x border-(--strip-line)">
        <Item
          className={cn(
            'grid h-full bg-(--strip-bg) text-inherit no-underline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current',
            announcement.href && 'group/announcement',
            hasAction
              ? 'grid-cols-(--linked-columns)'
              : 'grid-cols-(--plain-columns)'
          )}
          {...(announcement.href
            ? {
                href: announcement.href,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {})}
        >
          {announcement.logo ? (
            <span
              className={cn(cellClassName, 'announcement-mobile:px-2.5 px-6')}
            >
              <FindingLogo
                // The strip's colors are inverted relative to the page theme.
                logo={announcement.lightLogo ?? announcement.logo}
                lightLogo={announcement.logo}
                alt={announcement.logoAlt ?? ''}
                width={150}
                height={30}
                className="announcement-mobile:max-w-17 h-6 w-auto max-w-37.5 object-contain"
              />
            </span>
          ) : (
            <span
              className={cn(
                cellClassName,
                'announcement-mobile:px-1.5 announcement-mobile:text-[11px] px-4 text-sm font-semibold whitespace-nowrap text-(--strip-tag) uppercase'
              )}
            >
              {announcement.tag}
            </span>
          )}
          <span
            className={cn(
              cellClassName,
              'announcement-mobile:px-2.5 announcement-mobile:text-[12.5px] @container/announcement-text px-6 text-center text-[13.5px] font-medium tracking-[0.005em] [@media(width<=350px)]:px-1 [@media(width<=350px)]:text-[11.5px]'
            )}
          >
            <span
              className={cn(
                'announcement-compact:hidden announcement-mobile:hidden truncate',
                textHoverClassName
              )}
            >
              {announcement.text}
            </span>
            <span
              className={cn(
                'announcement-compact:block announcement-mobile:block hidden overflow-visible leading-[1.4] text-balance whitespace-normal',
                textHoverClassName
              )}
            >
              {announcement.mobileText.slice(0, lastSpace + 1)}
              <span className="announcement-mobile:whitespace-nowrap">
                {announcement.mobileText.slice(lastSpace + 1)}
                {announcement.href && (
                  <ArrowUpRight
                    className={cn(
                      arrowClassName,
                      'announcement-mobile:ml-1.5 announcement-mobile:inline-block announcement-mobile:align-[-2px] hidden'
                    )}
                    aria-hidden="true"
                  />
                )}
              </span>
            </span>
          </span>
          {hasAction && (
            <span
              className={cn(
                cellClassName,
                'announcement-mobile:hidden gap-2 px-4 text-sm font-semibold whitespace-nowrap'
              )}
            >
              {announcement.cta}
              <ArrowUpRight className={arrowClassName} aria-hidden="true" />
            </span>
          )}
          <span
            className={cn(cellClassName, 'border-r-0')}
            aria-hidden="true"
          />
        </Item>
      </div>
    </div>
  )
}

export function AnnouncementStrip({
  announcements,
}: {
  announcements: readonly Announcement[]
}) {
  const [rotation, setRotation] = useState({
    current: 0,
    previous: null as number | null,
  })
  const [closed, setClosed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const current = announcements[rotation.current]

  useEffect(() => {
    try {
      setClosed(sessionStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) === 'true')
    } catch {
      // Keep the strip usable when session storage is unavailable.
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageHidden(document.hidden)

    updateMotion()
    updateVisibility()
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (rotation.previous !== null) {
      const timeout = window.setTimeout(() => {
        setRotation((value) => ({ ...value, previous: null }))
      }, SCAN_DURATION)
      return () => window.clearTimeout(timeout)
    }

    if (!current || closed || hovered || focused || reducedMotion || pageHidden)
      return

    const timeout = window.setTimeout(() => {
      // Preferences can change just as a queued rotation is about to run.
      if (
        document.hidden ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return

      setRotation((value) => ({
        current: (value.current + 1) % announcements.length,
        previous: value.current,
      }))
    }, current.interval ?? ROTATION_INTERVAL)
    return () => window.clearTimeout(timeout)
  }, [
    announcements,
    current,
    rotation,
    closed,
    hovered,
    focused,
    reducedMotion,
    pageHidden,
  ])

  const dismiss = () => {
    document.documentElement.setAttribute(
      'data-announcements-dismissed',
      'true'
    )
    setClosed(true)
    try {
      sessionStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, 'true')
    } catch {
      // The strip can still be dismissed for the current page.
    }
  }

  if (!current || closed) return null

  const scanning = rotation.previous !== null

  return (
    <section
      className={cn(
        'peer/announcements relative h-10 overflow-hidden bg-(--strip-bg) text-(--strip-fg) [transition:background-color_350ms_ease] in-data-[announcements-dismissed=true]:hidden [@media(width<=520px)]:h-14',
        '[--scan-color:var(--strip-fg)] [--strip-bg:#0a0a0a] [--strip-fg:#ededed] [--strip-line:#3a3a3a] [--strip-tag:#8c8c8c] dark:[--strip-bg:#ebebeb] dark:[--strip-fg:#292929] dark:[--strip-line:#a9a9a9] dark:[--strip-tag:#686868]',
        'announcement-mobile:[--logo-width:97px] [--action-width:185px] [--close-width:72px] [--logo-width:247px] max-lg:[--close-width:calc(3rem+1px)] [@media(760px<width<1024px)]:[--logo-width:128px]',
        'announcement-mobile:[--linked-columns:var(--plain-columns)] [--linked-columns:var(--logo-width)_minmax(0,1fr)_var(--action-width)_var(--close-width)] [--plain-columns:var(--logo-width)_minmax(0,1fr)_var(--close-width)]',
        'motion-reduce:animate-none motion-reduce:transition-none motion-reduce:**:animate-none motion-reduce:**:transition-none'
      )}
      aria-label="Latest from Bluethroat Labs"
      aria-roledescription="announcements"
      aria-live="off"
      data-state="open"
      style={{ '--scan-duration': `${SCAN_DURATION}ms` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      }}
    >
      {rotation.previous !== null && (
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
          inert
        >
          <AnnouncementItem announcement={announcements[rotation.previous]} />
        </div>
      )}
      <div
        key={rotation.current}
        className={cn(
          'absolute inset-0 overflow-hidden',
          scanning &&
            'z-2 animate-[announcement-reveal_var(--scan-duration)_cubic-bezier(.37,0,.63,1)_both] will-change-transform'
        )}
      >
        <AnnouncementItem announcement={current} scanning={scanning} />
      </div>
      {scanning && (
        <span
          className="pointer-events-none absolute inset-0 z-5 animate-[announcement-reveal_var(--scan-duration)_cubic-bezier(.37,0,.63,1)_both,announcement-scan-fade_var(--scan-duration)_linear_both] will-change-[transform,opacity] before:absolute before:inset-y-0 before:right-px before:w-[clamp(120px,18vw,280px)] before:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--scan-color)_9%,transparent)_55%,color-mix(in_srgb,var(--scan-color)_24%,transparent))] before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-(--scan-color) after:shadow-[0_0_10px_1px_var(--scan-color)] after:content-['']"
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-6 container mx-auto border-x border-transparent">
        <button
          type="button"
          className="pointer-events-auto absolute inset-y-0 right-0 flex w-(--close-width) items-center justify-center text-inherit opacity-90 hover:bg-[color-mix(in_srgb,var(--strip-fg)_8%,transparent)] hover:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current"
          onClick={dismiss}
          aria-label="Close announcements"
        >
          <X size={16} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
