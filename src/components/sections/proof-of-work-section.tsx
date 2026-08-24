import { InfoIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LandingStripImageWithBlur } from '../ui/landing-strip-image-with-blur'
import { FindingsBackground } from '@/assets/findings-bg'
import { FindingsCarousel } from './findings-carousel'
import { FindingsList } from './findings-list'
import type { ProofOfWorkData } from '@/lib/sanity/proof-of-work'

export const ProofOfWorkSection = ({
  data,
}: {
  data: ProofOfWorkData | null
}) => {
  if (!data) return null

  return (
    <section
      id="proof-of-work"
      className="border-border relative isolate container mx-auto mt-18 border-y pt-18"
    >
      <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
        <div className="border-border flex h-full items-center border-r px-4 md:px-12">
          <h2 className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
            {data.title}
          </h2>
        </div>

        <div className="none relative h-full flex-1 overflow-hidden">
          <LandingStripImageWithBlur />
        </div>

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
            <DialogTitle className="sr-only">
              Finding disclosure notes
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-7 p-6 pr-14 text-sm leading-relaxed text-[#454545] sm:p-8 sm:pr-16 sm:text-base dark:text-[#A9A9A9]">
                <div className="space-y-2">
                  <p className="font-semibold text-[#292929] dark:text-[#E6E6E6]">
                    Severity note:
                  </p>
                  <p>{data.severityNote}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-[#292929] dark:text-[#E6E6E6]">
                    Confidentiality note:
                  </p>
                  <p>{data.confidentialityNote}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4 pt-6 pb-12 md:px-12">
        <p className="text-base leading-normal whitespace-pre-line text-[#2E2E2E] md:mb-8 md:text-lg dark:text-[#A9A9A9]">
          {data.description}
        </p>
      </div>

      <div className="border-border grid w-full grid-cols-1 border-y max-lg:place-items-center max-lg:gap-6 lg:grid-cols-[560px_1fr]">
        <div className="border-border grid w-full place-items-center max-lg:border-b lg:border-r">
          <div className="max-lg:border-x">
            <FindingsBackground
              className="h-auto w-full max-w-140"
              findingsCount={data.stats.totalFindings}
              severityCount={{
                critical: data.stats.criticalFindings,
                high: data.stats.highFindings,
                medium: data.stats.mediumFindings,
                low: data.stats.lowFindings,
              }}
            />
          </div>
        </div>

        <div className="max-lg:border-border h-full w-full min-w-0 max-lg:border-t">
          <FindingsCarousel findings={data.featuredFindings} />
        </div>
      </div>

      <div className="font-instrumental px-8 pt-12 pb-8 text-[32px] leading-normal">
        All Findings
      </div>

      <FindingsList findings={data.findings} />
    </section>
  )
}
