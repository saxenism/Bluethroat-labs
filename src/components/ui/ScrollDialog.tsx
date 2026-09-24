'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './dialog'

const dialogClasses = [
  'block h-[calc(100dvh_-_2rem)] max-h-[calc(100dvh_-_2rem)] gap-0',
  'w-[min(72.5rem,calc(100%_-_2rem))] max-w-[calc(100%_-_2rem)] sm:max-w-[calc(100%_-_2rem)]',
  'overflow-auto overscroll-contain border border-[#333] p-0 text-[#eee]',
  "[background:linear-gradient(#0006,#0006),url('/tools-and-research/textures/footer-bg-dark.webp')_center/cover_fixed,#111]",
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
  trigger?: ReactNode
  triggerClassName?: string
  closeLabel: string
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onCloseAutoFocus?: ComponentProps<typeof DialogContent>['onCloseAutoFocus']
}

export function ScrollDialog({
  trigger,
  triggerClassName,
  closeLabel,
  children,
  open,
  defaultOpen,
  onOpenChange,
  onCloseAutoFocus,
}: ScrollDialogProps) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger !== undefined ? (
        <DialogTrigger asChild>
          <button type="button" className={triggerClassName}>
            {trigger}
          </button>
        </DialogTrigger>
      ) : null}

      <DialogContent
        className={dialogClasses}
        overlayClassName="bg-[#000b]"
        showCloseButton={false}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <div className={toolbarClasses}>
          <DialogClose asChild>
            <button
              type="button"
              className={closeButtonClasses}
              aria-label={closeLabel}
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
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}
