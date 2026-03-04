'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** Default Sanskrit characters used for the scramble effect */
const DEFAULT_SANSKRIT_CHARS = 'अ आ इ ई उ ऊ ए ऐ ओ औ अं अः ऋ ॠ ऌ'.split(' ')

interface AnimatedCharacterProps {
  char: string
  isActive: boolean
  scrambleChars: string[]
  activeClassName?: string
  inactiveClassName?: string
  boxClassName?: string
  stepDuration?: number
}

/**
 * Renders a single character with optional scramble animation and box.
 * Purely visual; parent controls `isActive`.
 */
function AnimatedCharacter({
  char,
  isActive,
  scrambleChars,
  activeClassName = 'text-background',
  inactiveClassName = 'text-foreground',
  boxClassName = 'bg-foreground',
  stepDuration = 150,
}: AnimatedCharacterProps) {
  const [displayChar, setDisplayChar] = useState(char)
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isActive) {
      cycleIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * scrambleChars.length)
        setDisplayChar(scrambleChars[randomIndex] ?? char)
      }, stepDuration / 2)
    } else {
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current)
      setDisplayChar(char)
    }

    return () => {
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current)
    }
  }, [isActive, char, scrambleChars, stepDuration])

  return (
    <span className="relative inline-flex h-[1.2em] w-[1ch] items-center justify-center">
      <span
        className={cn(
          'absolute inset-0 ease-in-out',
          isActive
            ? `${boxClassName} scale-100 opacity-100`
            : 'scale-75 bg-transparent opacity-0'
        )}
        aria-hidden
      />
      <span
        className={cn(
          'relative z-10',
          isActive ? activeClassName : inactiveClassName
        )}
      >
        {displayChar}
      </span>
    </span>
  )
}

export interface SanskritHoverTextProps {
  /** Text to display; each character can scramble on hover */
  text: string
  /** Characters to cycle through during scramble (default: Sanskrit) */
  scrambleChars?: string[]
  /** Delay in ms between activating each character (default: 108) */
  stepDuration?: number
  /** Render as button (standalone) or span (e.g. inside Link). Default: span */
  as?: 'span' | 'button'
  /** Extra class names for the wrapper */
  className?: string
  /** Optional props when as="button" */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /** Optional props when as="span" */
  spanProps?: React.HTMLAttributes<HTMLSpanElement>
  /** Class when character is active (on box). Default: text-background */
  activeCharClassName?: string
  /** Class when character is inactive. Default: text-foreground */
  inactiveCharClassName?: string
  /** Class for the active character box. Default: bg-foreground */
  boxClassName?: string
}

/**
 * Reusable text that on hover animates character-by-character through a
 * scramble set (default: Sanskrit). Use inside Link for nav items or
 * as="button" for standalone buttons.
 */
export function SanskritHoverText({
  text,
  scrambleChars = DEFAULT_SANSKRIT_CHARS,
  stepDuration = 125,
  as: Component = 'span',
  className,
  buttonProps,
  spanProps,
  activeCharClassName,
  inactiveCharClassName,
  boxClassName,
}: SanskritHoverTextProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isHovered) {
      let current = 0
      setActiveIndex(0)

      timerRef.current = setInterval(() => {
        current++
        if (current < text.length) {
          setActiveIndex(current)
        } else {
          setActiveIndex(-1)
          if (timerRef.current) clearInterval(timerRef.current)
        }
      }, stepDuration)
    } else {
      setActiveIndex(-1)
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered, text.length, stepDuration])

  const sharedClassName = cn(
    'group relative flex items-center gap-0 tracking-tight outline-none cursor-pointer font-medium',
    className
  )

  const content = (
    <>
      {text.split('').map((char, index) => (
        <AnimatedCharacter
          key={`${index}-${char}`}
          char={char}
          isActive={activeIndex === index}
          scrambleChars={scrambleChars}
          activeClassName={activeCharClassName}
          inactiveClassName={inactiveCharClassName}
          boxClassName={boxClassName}
          stepDuration={stepDuration}
        />
      ))}
    </>
  )

  if (Component === 'button') {
    return (
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={sharedClassName}
        {...buttonProps}
      >
        <span className="sr-only">{text}</span>
        {content}
      </button>
    )
  }

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={sharedClassName}
      {...spanProps}
    >
      <span className="sr-only" aria-hidden>
        {text}
      </span>
      {content}
    </span>
  )
}
