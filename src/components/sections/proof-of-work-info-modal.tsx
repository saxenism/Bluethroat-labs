'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InfoIcon } from 'lucide-react'

type ProofOfWorkInfoModalProps = {
  severityNote: string
  confidentialityNote: string
}

export const ProofOfWorkInfoModal = ({
  severityNote,
  confidentialityNote,
}: ProofOfWorkInfoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="About finding severity and confidentiality"
          className="hover:bg-muted dark:hover:bg-muted grid w-15.5 place-items-center bg-[#fafafa] dark:bg-[#121212]"
        >
          <InfoIcon className="size-5 text-[#2E2E2E] dark:text-[#A9A9A9]" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-xl gap-0 p-0 max-lg:h-auto sm:max-w-xl">
        <DialogTitle className="sr-only">Finding disclosure notes</DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-7 p-6 pr-14 text-sm leading-relaxed text-[#454545] sm:p-8 sm:pr-16 sm:text-base dark:text-[#A9A9A9]">
            <div className="space-y-2">
              <p className="font-semibold text-[#292929] dark:text-[#E6E6E6]">
                Severity note:
              </p>
              <p>{severityNote}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-[#292929] dark:text-[#E6E6E6]">
                Confidentiality note:
              </p>
              <p>{confidentialityNote}</p>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
