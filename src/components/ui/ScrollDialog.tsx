'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const dialogClasses = [
  'fixed top-1/2 left-1/2 z-50 m-0 h-[calc(100dvh_-_2rem)] max-h-[calc(100dvh_-_2rem)] -translate-x-1/2 -translate-y-1/2 gap-0',
  'w-[min(72.5rem,calc(100%_-_2rem))] max-w-[calc(100%_-_2rem)] sm:max-w-[calc(100%_-_2rem)]',
  'overflow-auto overscroll-contain border border-[#333] p-0 text-[#eee]',
  "[background:linear-gradient(#0006,#0006),url('/tools-and-research/textures/footer-bg-dark.webp')_center/cover_fixed,#111]",
  'backdrop:bg-[#000b]',
  '[scrollbar-color:#777_#151515] max-lg:h-[calc(100dvh_-_2rem)]',
  'max-[47.5rem]:h-[calc(100dvh_-_1rem)] max-[47.5rem]:max-h-[calc(100dvh_-_1rem)]',
  'max-[47.5rem]:w-[calc(100%_-_1rem)] max-[47.5rem]:max-w-[calc(100%_-_1rem)]',
].join(' ')

const toolbarClasses = [
  'pointer-events-none sticky top-0 z-4 flex min-h-15 justify-end px-4 pt-3',
  'max-[30rem]:min-h-14 max-[30rem]:px-2.5 max-[30rem]:pt-2',
].join(' ')

const closeButtonClasses = [
  'pointer-events-auto inline-flex min-h-12 min-w-12 items-center justify-center',
  'rounded-none border border-[#555] bg-[#0a0a0a] p-0 text-[#eee]',
  'hover:border-[#aaa] hover:bg-[#222] focus-visible:outline-white',
  'max-[30rem]:min-h-11 max-[30rem]:min-w-11',
].join(' ')

interface ScrollDialogProps {
  closeLabel: string
  children: ReactNode
  open: boolean
  onOpenChange?: (open: boolean) => void
  onCloseAutoFocus?: () => void
  labelledBy?: string
}

export function ScrollDialog({
  closeLabel,
  children,
  open,
  onOpenChange,
  onCloseAutoFocus,
  labelledBy,
}: ScrollDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      wasOpen.current = true
      return
    }

    if (dialog.open) dialog.close()
    if (wasOpen.current) {
      wasOpen.current = false
      onCloseAutoFocus?.()
    }
  }, [onCloseAutoFocus, open])

  return (
    <dialog
      ref={dialogRef}
      className={dialogClasses}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onOpenChange?.(false)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange?.(false)
      }}
    >
      <div className={toolbarClasses}>
        <button
          type="button"
          className={closeButtonClasses}
          aria-label={closeLabel}
          onClick={() => onOpenChange?.(false)}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
      {children}
    </dialog>
  )
}
