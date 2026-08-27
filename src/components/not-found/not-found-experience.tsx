'use client'

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type PropsWithChildren,
} from 'react'
import styles from './not-found-experience.module.css'
import { usePathname } from 'next/navigation'
import { MoveRightIcon } from 'lucide-react'
import Link from 'next/link'

const CONFIG = {
  rain: {
    fontSize: 15,
    density: 0.85,
    lenMin: 2,
    lenMax: 4,
    speedMin: 0.14,
    speedMax: 0.55,
    headAlpha: 1,
    tailFalloff: 0.62,
    brightNoise: 0.6,
    mutateChance: 0.3,
    headMutateChance: 0.6,
    waitMax: 260,
  },
  grain: {
    tiles: 10,
    tileSize: 220,
    density: 0.55,
    idleOpacity: 0.085,
    burstOpacity: 0.2,
  },
  glitch: {
    idleChance: 0.006,
    burstChance: 0.0045,
    burstMinMs: 70,
    burstMaxMs: 230,
    maxOffsetX: 22,
    maxOffsetY: 5,
    ghostOpacity: 0.9,
    sliceChance: 0.45,
    stageShift: 9,
  },
} as const

const GLYPHS = (
  'अआइईउऊऋएऐओऔअंअः' +
  'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह' +
  'क्षत्रज्ञश्र' +
  '०१२३४५६७८९' +
  'ािीुूृेैोौंःँ्'
).split('')

const GHOSTS = [1, 2, 3] as const

type RainStrip = {
  col: number
  y: number
  len: number
  speed: number
  bright: number
  glyphs: string[]
  wait: number
}

type NotFoundStyles = CSSProperties & { '--grain-opacity': number }

type GlitchTextProps = PropsWithChildren & { variant?: 'box' | 'line' }

function GlitchText({ children, variant = 'line' }: GlitchTextProps) {
  const Wrapper: ElementType = variant === 'box' ? 'h1' : 'div'
  const Tag: ElementType = variant === 'box' ? 'span' : 'p'
  const wrapperClassName =
    variant === 'box'
      ? 'relative mb-[clamp(16px,2.1vw,42px)] inline-block'
      : 'relative block w-full max-w-full'
  const textClassName =
    variant === 'box'
      ? 'inline-block bg-white px-[.233em] py-[.117em] text-[clamp(56px,9.6vw,150px)] leading-none font-medium text-[#0a0a0a]'
      : 'block w-full max-w-full text-[clamp(11px,1.55vw,30px)] leading-[1.45] font-normal tracking-[.01em] break-words whitespace-normal'

  return (
    <Wrapper className={wrapperClassName}>
      <Tag className={textClassName} data-glitch-base>
        {children}
      </Tag>
      {GHOSTS.map((ghost) => (
        <Tag
          key={ghost}
          aria-hidden="true"
          className={`${textClassName} pointer-events-none absolute top-0 left-0 opacity-0 mix-blend-screen will-change-[transform,clip-path,opacity] ${
            ghost === 2
              ? 'brightness-50'
              : ghost === 3
                ? 'brightness-[.28]'
                : ''
          }`}
          data-glitch-ghost
        >
          {children}
        </Tag>
      ))}
    </Wrapper>
  )
}

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min)

const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

export function NotFoundExperience() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rainCanvasRef = useRef<HTMLCanvasElement>(null)
  const grainCanvasRef = useRef<HTMLCanvasElement>(null)
  const path = usePathname()

  useEffect(() => {
    const stage = stageRef.current
    const rainCanvas = rainCanvasRef.current
    const grainCanvas = grainCanvasRef.current
    const rainContext = rainCanvas?.getContext('2d', { alpha: false })
    const grainContext = grainCanvas?.getContext('2d')

    if (
      !stage ||
      !rainCanvas ||
      !grainCanvas ||
      !rainContext ||
      !grainContext
    ) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const bases = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-glitch-base]')
    )
    const ghosts = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-glitch-ghost]')
    )

    let strips: RainStrip[] = []
    let columnCount = 0
    let width = 0
    let height = 0
    let tiles: HTMLCanvasElement[] = []
    let tileIndex = 0
    let burstUntil = 0
    let lastFrame = 0
    let animationFrame = 0
    let cancelled = false
    const idleTimeouts = new Set<number>()

    const newStrip = (initial: boolean): RainStrip => {
      const rain = CONFIG.rain
      const len = Math.round(randomBetween(rain.lenMin, rain.lenMax))

      return {
        col: (Math.random() * columnCount) | 0,
        y: initial
          ? randomBetween(-len, height / rain.fontSize)
          : -len - randomBetween(0, 12),
        len,
        speed: randomBetween(rain.speedMin, rain.speedMax),
        bright: 1 - Math.random() * rain.brightNoise,
        glyphs: Array.from({ length: len }, randomGlyph),
        wait: initial ? 0 : (Math.random() * rain.waitMax) | 0,
      }
    }

    const sizeRain = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = rainCanvas.clientWidth
      height = rainCanvas.clientHeight
      rainCanvas.width = Math.floor(width * pixelRatio)
      rainCanvas.height = Math.floor(height * pixelRatio)
      rainContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const { fontSize, density } = CONFIG.rain
      columnCount = Math.ceil(width / fontSize)
      strips = Array.from({ length: Math.round(columnCount * density) }, () =>
        newStrip(true)
      )
      rainContext.font = `${fontSize}px ${window.getComputedStyle(stage).fontFamily}`
      rainContext.textBaseline = 'top'
    }

    const drawRain = () => {
      const rain = CONFIG.rain
      const fontSize = rain.fontSize

      rainContext.fillStyle = '#0a0a0a'
      rainContext.fillRect(0, 0, width, height)

      strips.forEach((strip, stripIndex) => {
        if (strip.wait > 0) {
          strip.wait -= 1
          return
        }

        const x = strip.col * fontSize
        const headRow = Math.floor(strip.y)

        for (let glyphIndex = 0; glyphIndex < strip.len; glyphIndex += 1) {
          const mutateChance =
            glyphIndex === 0 ? rain.headMutateChance : rain.mutateChance

          if (Math.random() < mutateChance) {
            strip.glyphs[glyphIndex] = randomGlyph()
          }

          const alpha =
            rain.headAlpha *
            strip.bright *
            Math.pow(rain.tailFalloff, glyphIndex)

          if (alpha < 0.012) break

          rainContext.fillStyle = `rgba(255,255,255,${alpha})`
          rainContext.fillText(
            strip.glyphs[glyphIndex],
            x,
            (headRow - glyphIndex) * fontSize
          )
        }

        strip.y += strip.speed
        if ((headRow - strip.len) * fontSize > height) {
          strips[stripIndex] = newStrip(false)
        }
      })
    }

    const buildGrain = () => {
      const grain = CONFIG.grain
      tiles = Array.from({ length: grain.tiles }, () => {
        const tile = document.createElement('canvas')
        tile.width = tile.height = grain.tileSize
        const tileContext = tile.getContext('2d')

        if (!tileContext) return tile

        const image = tileContext.createImageData(
          grain.tileSize,
          grain.tileSize
        )
        const pixels = image.data

        for (let index = 0; index < pixels.length; index += 4) {
          if (Math.random() > grain.density) continue

          const value = (Math.random() * 255) | 0
          pixels[index] = value
          pixels[index + 1] = value
          pixels[index + 2] = value
          pixels[index + 3] = (Math.random() * 255) | 0
        }

        tileContext.putImageData(image, 0, 0)
        return tile
      })
    }

    const sizeGrain = () => {
      grainCanvas.width = grainCanvas.clientWidth
      grainCanvas.height = grainCanvas.clientHeight
    }

    const drawGrain = () => {
      const grain = CONFIG.grain
      const tile = tiles[(tileIndex = (tileIndex + 1) % tiles.length)]

      if (!tile) return

      const pattern = grainContext.createPattern(tile, 'repeat')
      if (!pattern) return

      grainContext.clearRect(0, 0, grainCanvas.width, grainCanvas.height)
      grainContext.save()
      grainContext.translate(
        -randomBetween(0, grain.tileSize),
        -randomBetween(0, grain.tileSize)
      )
      grainContext.fillStyle = pattern
      grainContext.fillRect(
        0,
        0,
        grainCanvas.width + grain.tileSize,
        grainCanvas.height + grain.tileSize
      )
      grainContext.restore()
    }

    const applyGlitch = (intensity: number) => {
      const glitch = CONFIG.glitch

      ghosts.forEach((ghost, index) => {
        const direction = index % 2 ? -1 : 1
        const offsetX =
          direction * randomBetween(1.5, glitch.maxOffsetX) * intensity
        const offsetY = randomBetween(-1, 1) * glitch.maxOffsetY * intensity
        const top = randomBetween(0, 68)
        const bottom = randomBetween(0, Math.max(0, 96 - top))

        ghost.style.opacity = String(
          glitch.ghostOpacity * (0.55 + intensity * 0.45)
        )
        ghost.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`
        ghost.style.clipPath = `inset(${top.toFixed(1)}% 0 ${bottom.toFixed(1)}% 0)`
      })

      bases.forEach((base) => {
        if (intensity > 0.5 && Math.random() < glitch.sliceChance) {
          const top = randomBetween(0, 55)
          base.style.clipPath = `inset(${top.toFixed(1)}% 0 ${randomBetween(0, 30).toFixed(1)}% 0)`
        } else {
          base.style.clipPath = 'none'
        }
      })

      if (intensity > 0.6) {
        stage.style.transform = `translate(${randomBetween(-1, 1) * glitch.stageShift * intensity}px, ${randomBetween(-1, 1) * 2}px)`
      }
    }

    const clearGlitch = () => {
      ghosts.forEach((ghost) => {
        ghost.style.opacity = '0'
        ghost.style.transform = 'none'
        ghost.style.clipPath = 'none'
      })
      bases.forEach((base) => {
        base.style.clipPath = 'none'
      })
      stage.style.transform = 'none'
      stage.style.setProperty(
        '--grain-opacity',
        String(CONFIG.grain.idleOpacity)
      )
    }

    const fireBurst = (milliseconds: number, strength = 1) => {
      burstUntil = performance.now() + milliseconds
      stage.style.setProperty(
        '--grain-opacity',
        String(CONFIG.grain.burstOpacity * strength)
      )
    }

    const handleClick = () => {
      fireBurst(randomBetween(320, 520), 1.4)
    }

    const handleResize = () => {
      sizeRain()
      sizeGrain()
    }

    const frame = (now: number) => {
      animationFrame = window.requestAnimationFrame(frame)

      if (now - lastFrame > 33) {
        lastFrame = now
        drawRain()
        drawGrain()
      }

      const glitch = CONFIG.glitch
      if (now < burstUntil) {
        applyGlitch(randomBetween(0.55, 1))
      } else if (Math.random() < glitch.burstChance) {
        fireBurst(randomBetween(glitch.burstMinMs, glitch.burstMaxMs))
      } else if (Math.random() < glitch.idleChance) {
        applyGlitch(randomBetween(0.06, 0.16))
        const timeout = window.setTimeout(() => {
          clearGlitch()
          idleTimeouts.delete(timeout)
        }, 40)
        idleTimeouts.add(timeout)
      } else if (ghosts[0]?.style.opacity !== '0') {
        clearGlitch()
      }
    }

    const boot = () => {
      if (cancelled) return

      sizeRain()
      sizeGrain()
      buildGrain()
      clearGlitch()

      if (reducedMotion) {
        drawRain()
        drawGrain()
      } else {
        animationFrame = window.requestAnimationFrame(frame)
      }
    }

    stage.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    if (document.fonts?.ready) {
      void document.fonts.ready.then(boot)
    } else {
      boot()
    }

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrame)
      idleTimeouts.forEach((timeout) => window.clearTimeout(timeout))
      stage.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      stage.style.removeProperty('--grain-opacity')
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className={`${styles.stage} fixed -inset-7 isolate cursor-crosshair overflow-hidden bg-[#0a0a0a] font-mono text-white antialiased`}
      style={{ '--grain-opacity': CONFIG.grain.idleOpacity } as NotFoundStyles}
    >
      <canvas
        ref={rainCanvasRef}
        aria-hidden="true"
        className={`${styles.rain} absolute inset-0 h-full w-full`}
      />

      <main className="absolute inset-7 z-2 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <GlitchText variant="box">404</GlitchText>
        <GlitchText>THIS PATH MADE AN ASSUMPTION. IT WAS WRONG.</GlitchText>
        <GlitchText>
          <span className="mt-2 flex max-w-full flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
            <span className="max-w-full break-all">{path}</span>
            <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap">
              <MoveRightIcon aria-hidden="true" className="size-[1.2em]" />
              NO MATCH
            </span>
          </span>
        </GlitchText>
        <Link href="/" className="mt-4 hover:bg-white hover:text-black">
          <GlitchText>[RETURN TO A KNOWN STATE]</GlitchText>
        </Link>
      </main>

      <canvas
        ref={grainCanvasRef}
        aria-hidden="true"
        className={`${styles.grain} pointer-events-none absolute inset-0 z-3 h-full w-full`}
      />
      <div
        aria-hidden="true"
        className={`${styles.scanlines} pointer-events-none absolute inset-0 z-4`}
      />
      <div
        aria-hidden="true"
        className={`${styles.bands} pointer-events-none absolute inset-0 z-4`}
      />
      <div
        aria-hidden="true"
        className={`${styles.vignette} pointer-events-none absolute inset-0 z-5`}
      />
    </div>
  )
}
