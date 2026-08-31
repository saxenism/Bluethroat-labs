import { TelegramIcon } from '@/assets/icons'
import { CALENDAR_LINK, TELEGRAM_CHAT_LINK } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section
      id="cta"
      className="border-border relative isolate grid place-items-center border-b px-12 py-12"
    >
      <div className="border-border absolute top-0 left-0 size-12 border-r border-b"></div>
      <div className="border-border absolute top-0 right-0 size-12 border-b border-l"></div>
      <div className="border-border absolute bottom-0 left-0 size-12 border-t border-r"></div>
      <div className="border-border absolute right-0 bottom-0 size-12 border-t border-l"></div>

      <div className="relative w-full px-6 py-12 md:px-18">
        <Image
          src="/landing/cta-bg.png"
          alt="Background"
          fill
          className="-z-1 object-cover object-top opacity-40 dark:opacity-20"
        />

        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-pretty">
            Ready to secure your protocol?
          </h2>

          <p className="font-medium text-pretty text-[#292929] dark:text-[#FAFAFA]">
            Book a 30-minute consultation with our security team. We&apos;ll
            walk through your architecture, surface where the real risk lives,
            and tell you straight whether an audit makes sense for where you are
            right now.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={CALENDAR_LINK}
            target="_blank"
            className="hover:dark:bg-foreground hover:bg-foreground items-center justify-center gap-4 bg-[#292929] px-4 py-2 text-center text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929]"
          >
            <span className="text-center text-base font-semibold">
              Book a Security Consultation
            </span>
          </Link>

          <Link
            href={TELEGRAM_CHAT_LINK}
            target="_blank"
            className="flex items-center justify-center gap-4 border border-[#A9A9A9] bg-[#FAFAFA] px-4 py-2 text-[#2E2E2E] hover:bg-[#E6E6E6] dark:border-[#2E2E2E] dark:bg-[#0A0A0A] dark:text-[#E6E6E6] dark:hover:bg-[#292929]"
          >
            <TelegramIcon />
            <span className="text-base font-semibold">Contact us</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
