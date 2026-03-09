import { LandingStripImage } from '../ui/landing-strip-image'

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
          <LandingStripImage />
        </div>
      </div>

      <div className="p-4 pt-6 pb-12 md:p-12 md:pb-18">
        <p className="tex-[#292929] mb-6 text-base leading-relaxed md:mb-8 md:text-2xl dark:text-[#E6E6E6]">
          Bluethroat Labs exists to accelerate the security maturity of Web3. Security cannot be solved with generic tools. Every domain has
          its own assumptions, attack surfaces, and failure modes that must be
          understood from first principles.
        </p>
        <p className="tex-[#292929] mb-6 text-base leading-relaxed md:mb-8 md:text-2xl dark:text-[#E6E6E6]">
          We build domain-specific AI security agents to study these domains
          deeply, surface vulnerabilities earlier, and share intelligence across
          systems.
        </p>
        <p className="tex-[#292929] mt-10 text-base leading-relaxed md:text-2xl dark:text-[#E6E6E6]">
          Success means closing the gap between how fast Web3 ships and how
          slowly it learns from its mistakes.
        </p>
      </div>
    </section>
  )
}
