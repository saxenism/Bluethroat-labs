import Link from 'next/link'
import { IconLogo } from '@/assets/logos'
import { MailIcon, XIcon } from '@/assets/icons'
import { CopyrightIcon } from 'lucide-react'

export function DocsFooter() {
  return (
    <footer className="bg-background border-border mt-18 border-y">
      <div className="">
        <div className="flex items-stretch justify-between">
          <Link
            href="/"
            className="group flex h-12 items-center justify-center px-3 lg:h-17 lg:justify-start lg:px-4.5 lg:py-0"
          >
            <IconLogo className="max-lg:h-6" />
          </Link>

          <div className="flex h-12 items-center justify-center lg:h-17">
            <a
              href="mailto:saxenism@bluethroatlabs.com"
              className="grid aspect-square h-full place-items-center hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
            >
              <MailIcon className="text-[#292929] max-lg:size-5.5 dark:text-[#E6E6E6]" />
            </a>
            <a
              href="https://x.com/bluethroat_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="grid aspect-square h-full place-items-center hover:bg-[#E6E6E6] dark:hover:bg-[#292929]"
            >
              <XIcon className="text-[#292929] max-lg:size-4.5 dark:text-[#E6E6E6]" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-border text-foreground flex items-center justify-center border-t bg-[#f2f2f2] p-3 text-sm dark:bg-[#191919]">
        <p className="flex items-center gap-2 whitespace-nowrap">
          <CopyrightIcon className="text-foreground/70 h-6 w-6" />
          <span className="text-foreground/70 text-base font-medium">
            {new Date().getFullYear()} Bluethroat Labs
          </span>
        </p>
      </div>
    </footer>
  )
}
