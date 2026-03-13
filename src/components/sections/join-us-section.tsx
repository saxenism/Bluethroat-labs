import { MailIcon } from '@/assets/icons'
import { ImageWithBlur } from '../ui/image-with-blur'

export function JoinUsSection() {
  return (
    <section className="border-border relative isolate grid place-items-center border-b px-4 py-18 md:py-36">
      <ImageWithBlur
        src="/join-us/bg-dark.png"
        alt="Background"
        fill
        className="none -z-1 hidden object-cover dark:block"
        preload
      />
      <ImageWithBlur
        src="/join-us/bg-light.png"
        alt="Background"
        fill
        className="none -z-1 object-cover dark:hidden"
        preload
      />

      <div className="border-border relative w-full max-w-4xl border bg-[#F2F2F2] dark:bg-[#191919]">
        <div className="px-4 pt-12 pb-18 text-center md:p-12">
          <span className="text-foreground mb-6 block text-base font-semibold uppercase md:mb-8 md:text-2xl">
            JOIN US
          </span>

          <h2 className="font-instrumental mb-4 text-[32px] leading-tight font-normal text-pretty md:mb-6 md:text-5xl">
            In the age of AI, clear thinkers prevail.
          </h2>

          <p className="leading-relaxed font-medium text-pretty text-[#666666] dark:text-[#8F8F8F]">
            If you fall into rabbit holes and don&apos;t stop until you
            understand how something breaks, Bluethroat Labs is the right place
            for you. <br />
            <br />
          </p>

          <p className="leading-relaxed font-medium text-pretty text-[#666666] dark:text-[#8F8F8F]">
            We have uncovered multiple novel vulnerabilities in live production
            systems across domains with our rigour and methods. <br />
            <br />
          </p>

          <p className="leading-relaxed font-medium text-pretty text-[#666666] dark:text-[#8F8F8F]">
            Send us a short intro if that sounds like your kind of fun. We are
            hiring across all domains and levels of experience.
          </p>
        </div>

        <a
          href="mailto:saxenism@bluethroatlabs.com"
          className="hover:dark:bg-foreground hover:bg-foreground flex h-18 items-center justify-center gap-4 bg-[#292929] text-[#E6E6E6] dark:bg-[#E6E6E6] dark:text-[#292929]"
        >
          <MailIcon className="h-6 w-6" />
          <span className="text-xl leading-relaxed font-semibold">
            Send us a short intro
          </span>
        </a>
      </div>
    </section>
  )
}
