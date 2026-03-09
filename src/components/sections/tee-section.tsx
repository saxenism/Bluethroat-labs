import Image from 'next/image'

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
            <p className="max-w-[970px] text-right text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              We began with Trusted Execution Environments. In Web3, TEE
              security had few shared standards and no publicly accumulated
              knowledge. Studying these systems from first principles led to
              confirmed findings across every major TEE-heavy protocol in Web3.
            </p>

            <p className="max-w-[970px] text-right text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              We then applied the same methodology to consensus protocols, a
              completely different domain with its own assumptions and failure
              modes. The result was the same: novel vulnerabilities caught in
              live production systems.
            </p>

            <p className="font-instrumental text-2xl leading-relaxed text-[#191919] md:text-[32px] dark:text-[#EBEBEB]">
              Most &quot;AI&quot; agents search for patterns from the past.
              <br />
              Our agents reason about systems they have never seen before.
              <br />
              Two domains tested. The methodology holds.
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
          <div className="flex max-w-[874px] flex-col gap-6">
            <p className="text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              Complex protocols span many domains. Securing them requires more than a single agent or a single audit.
            </p>

            <p className="text-base leading-relaxed font-medium text-[#454545] md:text-2xl dark:text-[#CACACA]">
              We build an ecosystem of domain-expert AI agents that reason together across subsystems. Each agent knows its domain. Together they know your protocol.
            </p>

            <p className="font-instrumental text-2xl leading-relaxed text-[#191919] md:text-[32px] dark:text-[#EBEBEB]">
              Not a tool. Domain experts reasoning together across your protocol. <br />
              Built for your codebase. With every run they learn it more deeply. <br />
              Security that compounds with time.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
