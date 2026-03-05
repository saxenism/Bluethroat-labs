import Image from 'next/image'

export function MissionSection() {
  return (
    <section
      id="mission"
      className="border-border relative isolate container mx-auto mt-18 border-b"
    >
      <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
        <div className="border-border flex h-full items-center border-r px-4 md:px-12">
          <span className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
            Our Mission
          </span>
        </div>

        <div className="none relative h-full flex-1 overflow-hidden">
          <Image
            src="/landing/footer-bg-light.png"
            alt="Footer"
            fill
            className="object-cover dark:hidden"
          />
          <Image
            src="/landing/footer-bg-dark.png"
            alt="Footer"
            fill
            className="hidden object-cover dark:block"
          />
        </div>
      </div>

      <div className="p-4 pt-6 pb-12 md:p-12 md:pb-18">
        <p className="tex-[#292929] text-base leading-relaxed md:text-2xl dark:text-[#E6E6E6]">
          At Bluethroat Labs, our mission is to accelerate the security maturity
          of Trusted Execution Environments (TEEs) in Web3. The smart contract
          ecosystem only became meaningfully safer once vulnerable patterns and
          hard-earned lessons were openly documented and best practices were
          widely internalized. Before that, security knowledge stayed trapped in
          isolated &quot;security islands&quot;, slowing progress while
          attackers only needed to be right once.
        </p>
      </div>
    </section>
  )
}
