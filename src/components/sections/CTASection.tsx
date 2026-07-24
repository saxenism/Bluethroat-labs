import { CALENDAR_LINK } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section
      id="cta"
      className="border-border relative isolate grid place-items-center border-b px-4 py-12"
    >
      <Image
        src="/landing/cta-bg.png"
        alt="Background"
        fill
        className="-z-1 object-cover dark:opacity-60"
      />

      <div className="relative w-full max-w-210 bg-[#F2F2F2] dark:bg-[#191919]">
        <div className="px-4 pt-7 pb-18 text-center md:p-12 md:pt-7">
          <Image
            src="/landing/cta-logo.png"
            alt="CTA Bluethroat Labs Logo"
            width={104}
            height={96}
            className="mx-auto mb-4"
          />

          <h2 className="font-instrumental mb-4 text-[32px] leading-tight font-normal text-pretty md:mb-6 md:text-5xl">
            Ready to secure your protocol?
          </h2>

          <p className="leading-relaxed font-medium text-pretty text-[#666666] dark:text-[#8F8F8F]">
            Book a 30-minute consultation with our security team. We&apos;ll
            walk through your architecture, surface where the real risk lives,
            and tell you straight whether an audit makes sense for where you are
            right now.
          </p>
        </div>

        <Link
          href={CALENDAR_LINK}
          target="_blank"
          className="hover:dark:bg-foreground hover:bg-foreground flex h-18 items-center justify-center gap-4 bg-[#292929] text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929]"
        >
          <span className="text-xl leading-relaxed font-semibold">
            Book a Security Consultation
          </span>
        </Link>
      </div>
    </section>
  )
}
