'use client'

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import { IconLogo } from '@/assets/logos'
import { cn } from '@/lib/utils'

export type BluethroatLoaderTimings = {
  count: number
  holdAtFull: number
  numberOut: number
  beforeScale: number
  scale: number
  scaleTo: number
  floodStart: number
  floodDuration: number
  holdFlood: number
  crossfade: number
  scaleEase: string
}

export const DEFAULT_BLUETHROAT_LOADER_TIMINGS: BluethroatLoaderTimings = {
  count: 800,
  holdAtFull: 110,
  numberOut: 100,
  beforeScale: 30,
  scale: 225,
  scaleTo: 20,
  floodStart: 105,
  floodDuration: 120,
  holdFlood: 160,
  crossfade: 325,
  scaleEase: 'cubic-bezier(.7,0,.84,0)',
}

type LoaderStyle = CSSProperties & {
  '--loader-background': string
  '--loader-logo': string
  '--loader-counter': string
  '--loader-logo-size': string
  '--loader-counter-size': string
  '--loader-gap': string
}

export type BluethroatLoaderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  active?: boolean
  placement?: 'fullscreen' | 'contained'
  showCounter?: boolean
  label?: string
  backgroundColor?: string
  logoColor?: string
  counterColor?: string
  logoSize?: string
  counterSize?: string
  gap?: string
  timings?: Partial<BluethroatLoaderTimings>
  onComplete?: () => void
}

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

export function BluethroatLoader({
  active = true,
  placement = 'fullscreen',
  showCounter = true,
  label = 'Loading Bluethroat Labs',
  backgroundColor = '#0a0a0a',
  logoColor = '#1f1f1f',
  counterColor = '#b3b3b3',
  logoSize = 'clamp(72px, 8.33vw, 120px)',
  counterSize = 'clamp(28px, 3.33vw, 48px)',
  gap = 'clamp(32px, 3.9vw, 56px)',
  timings,
  onComplete,
  className,
  style,
  ...props
}: BluethroatLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const floodRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)

  const animation = useMemo(
    () => ({ ...DEFAULT_BLUETHROAT_LOADER_TIMINGS, ...timings }),
    [timings]
  )

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const loader = loaderRef.current
    const logo = logoRef.current
    const logoWrap = logoWrapRef.current
    const counter = counterRef.current
    const flood = floodRef.current

    if (!loader || !logo || !logoWrap || !counter || !flood) return

    if (!active) {
      loader.style.display = 'none'
      loader.dataset.state = 'idle'
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      loader.style.display = 'none'
      loader.dataset.state = 'complete'
      const completionTimeout = window.setTimeout(
        () => onCompleteRef.current?.(),
        0
      )

      return () => window.clearTimeout(completionTimeout)
    }

    let cancelled = false
    let animationFrame = 0
    let scrollRestored = false
    const timeouts = new Set<number>()
    const previousBodyOverflow = document.body.style.overflow

    if (placement === 'fullscreen') document.body.style.overflow = 'hidden'

    const restoreScroll = () => {
      if (scrollRestored || placement !== 'fullscreen') return
      scrollRestored = true

      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = previousBodyOverflow
      }
    }

    const wait = (milliseconds: number) =>
      new Promise<void>((resolve) => {
        const timeout = window.setTimeout(() => {
          timeouts.delete(timeout)
          resolve()
        }, milliseconds)
        timeouts.add(timeout)
      })

    const setProgress = (progress: number) => {
      logo.style.clipPath = `inset(${100 - progress}% 0 0 0)`
      counter.textContent = `${Math.round(progress)}%`
    }

    const countToFull = () =>
      new Promise<void>((resolve) => {
        const start = performance.now()

        const tick = (now: number) => {
          if (cancelled) {
            resolve()
            return
          }

          const progress = Math.min(1, (now - start) / animation.count)
          setProgress(easeOutCubic(progress) * 100)

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(tick)
          } else {
            resolve()
          }
        }

        animationFrame = window.requestAnimationFrame(tick)
      })

    const reset = () => {
      loader.style.display = 'flex'
      loader.style.opacity = '1'
      loader.style.pointerEvents = 'auto'
      loader.style.transition = 'none'
      loader.setAttribute('aria-busy', 'true')
      loader.dataset.state = 'loading'

      logoWrap.style.opacity = '1'
      logoWrap.style.transform = 'scale(1)'
      logoWrap.style.transition = 'none'

      counter.style.opacity = '1'
      counter.style.transition = 'none'

      flood.style.opacity = '0'
      flood.style.transition = 'none'

      setProgress(0)
      void loader.offsetWidth
      counter.style.transition = `opacity ${animation.numberOut}ms ease`
    }

    const run = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready
        } catch {
          // Font loading failure should not prevent access to the page.
        }
      }

      if (cancelled) return
      reset()

      await countToFull()
      if (cancelled) return

      await wait(animation.holdAtFull)
      if (cancelled) return

      counter.style.opacity = '0'
      await wait(animation.numberOut + animation.beforeScale)
      if (cancelled) return

      logoWrap.style.transition = `transform ${animation.scale}ms ${animation.scaleEase}`
      logoWrap.style.transform = `scale(${animation.scaleTo})`

      await wait(animation.floodStart)
      if (cancelled) return

      flood.style.transition = `opacity ${animation.floodDuration}ms linear`
      flood.style.opacity = '1'

      await wait(
        Math.max(
          animation.scale - animation.floodStart,
          animation.floodDuration
        ) + animation.holdFlood
      )
      if (cancelled) return

      loader.style.transition = `opacity ${animation.crossfade}ms ease`
      loader.style.opacity = '0'

      await wait(animation.crossfade)
      if (cancelled) return

      loader.style.display = 'none'
      loader.style.pointerEvents = 'none'
      loader.setAttribute('aria-busy', 'false')
      loader.dataset.state = 'complete'
      restoreScroll()
      onCompleteRef.current?.()
    }

    void run()

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrame)
      timeouts.forEach(window.clearTimeout)
      restoreScroll()
    }
  }, [active, animation, placement])

  const loaderStyle: LoaderStyle = {
    '--loader-background': backgroundColor,
    '--loader-logo': logoColor,
    '--loader-counter': counterColor,
    '--loader-logo-size': logoSize,
    '--loader-counter-size': counterSize,
    '--loader-gap': gap,
    ...style,
  }

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-busy={active}
      data-state={active ? 'loading' : 'idle'}
      className={cn(
        'isolate z-100 flex items-center justify-center overflow-hidden bg-(--loader-background) motion-reduce:hidden',
        placement === 'fullscreen' ? 'fixed inset-0' : 'absolute inset-0',
        className
      )}
      style={loaderStyle}
      {...props}
    >
      <span className="sr-only">{label}</span>

      <div
        ref={logoWrapRef}
        aria-hidden="true"
        className="size-(--loader-logo-size) origin-center will-change-transform"
      >
        <div
          ref={logoRef}
          className="size-full"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <IconLogo className="size-full fill-(--loader-logo)" />
        </div>
      </div>

      <div
        ref={counterRef}
        aria-hidden="true"
        className={cn(
          'font-instrumental absolute top-[calc(50%+(var(--loader-logo-size)/2)+var(--loader-gap))] right-0 left-0 text-center text-(length:--loader-counter-size) leading-none font-normal text-(--loader-counter) lining-nums',
          !showCounter && 'invisible'
        )}
      >
        0%
      </div>

      <div
        ref={floodRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-(--loader-logo) opacity-0"
      />
    </div>
  )
}
