import { CornerUpRightIcon } from 'lucide-react'
import Image from 'next-export-optimize-images/image'
import Link from 'next/link'

export function TeeSection() {
  return (
    <>
      <section
        id="tee-section-1"
        className="border-border relative isolate border-b pt-18 pb-34 md:pt-60 md:pb-36"
      >
        <div className="to-background absolute top-0 right-0 bottom-0 left-0 z-0 h-full w-full bg-linear-to-t from-transparent via-transparent via-50% lg:right-1/2 lg:w-1/2 lg:bg-linear-to-r lg:via-80%"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-1 h-full w-full lg:right-1/2 lg:w-1/2">
          <Image
            src="/landing/tee-1.png"
            alt="Background"
            fill
            className="none -z-1 object-cover"
          />
        </div>

        <div className="absolute right-1/2 bottom-0 left-0 h-2 bg-[#666666] md:hidden dark:bg-[#454545]" />
        <div className="absolute top-0 right-0 bottom-1/2 w-2 bg-[#666666] max-md:hidden dark:bg-[#454545]" />

        <span className="absolute top-2 right-4 text-[#666666] max-md:hidden dark:text-[#454545]">
          1/2
        </span>

        <div className="relative z-1 px-4 text-right md:px-24">
          <div className="flex flex-col items-end gap-6">
            <p className="max-w-[812px] text-right text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              Trusted Execution Environments are a proven security primitive.
              They have been used for years in phones, payments, and other
              security-critical systems.
            </p>

            <p className="max-w-[874px] text-right text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              In Web3, TEEs are held to a different bar. Hardware trust sits
              uneasily with decentralisation and transparency.
            </p>

            <p className="font-instrumental text-2xl leading-relaxed text-[#191919] md:text-[32px] dark:text-[#EBEBEB]">
              That Tension Cannot Be Ignored. <br />
              If It Is Not Modelled Honestly, It Fails In Production.
            </p>
          </div>
        </div>
      </section>

      <section
        id="tee-section-2"
        className="border-border relative isolate border-b pt-18 pb-64 md:pt-78 md:pb-36"
      >
        <div className="to-background absolute top-0 right-0 bottom-0 left-0 z-0 h-full w-full bg-linear-to-t from-transparent via-transparent via-50% lg:left-1/2 lg:w-1/2 lg:bg-linear-to-l lg:via-80%"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-1 h-full w-full lg:left-1/2 lg:w-1/2">
          <Image
            src="/landing/tee-2.png"
            alt="Background"
            fill
            className="none -z-1 object-cover"
          />
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-2 bg-[#666666] md:hidden dark:bg-[#454545]" />
        <div className="absolute top-0 right-0 bottom-0 w-2 bg-[#666666] max-md:hidden dark:bg-[#454545]" />

        <span className="absolute top-2 right-4 text-[#666666] max-md:hidden dark:text-[#454545]">
          2/2
        </span>

        <div className="relative z-1 px-4 md:px-24">
          <div className="flex max-w-[724px] flex-col gap-6">
            <p className="font-instrumental text-2xl leading-relaxed text-[#191919] md:text-[32px] dark:text-[#EBEBEB]">
              As TEEs move deeper into Web3, clarity becomes
              critical.Assumptions about hardware trust do not survive
              adversarial settings.
            </p>

            <p className="font-instrumental text-2xl leading-relaxed text-[#191919] md:text-[32px] dark:text-[#EBEBEB]">
              The{' '}
              <Link
                href="/docs"
                className="border-b border-transparent text-[#8F8F8F] italic hover:border-[#292929] hover:text-[#292929] dark:text-[#7D7D7D] dark:hover:border-[#E6E6E6] dark:hover:text-[#E6E6E6]"
              >
                TEE Security Handbook{' '}
                <CornerUpRightIcon className="stroke-1.5 mr-1 ml-1 inline-block" />
              </Link>{' '}
              exists to document real guarantees, real failure modes, and
              practical integration patterns.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
