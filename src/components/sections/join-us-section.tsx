import Image from 'next/image'
import Link from 'next/link'

export function JoinUsSection() {
  return (
    <section id="reveries" className="w-full">
      <div className="relative isolate h-48 w-full sm:h-52">
        <Image
          src="/reveries/bg.png"
          alt=""
          fill
          className="none -z-1 object-cover max-lg:object-[75%] dark:opacity-40"
          priority
        />

        <div className="flex h-full items-end p-4 md:px-8">
          <h1 className="font-instrumental text-5xl text-balance text-[#F2F2F2] sm:text-7xl">
            Be a part of Bluethroat Labs
          </h1>
        </div>
      </div>

      <div className="bg-[#EBEBEB] p-4 text-base font-medium sm:font-semibold md:p-8 md:text-lg dark:bg-[#191919]">
        There isn’t just one way in. Choose how you want to engage, build, and
        grow with Bluethroat Labs.
      </div>

      <div className="border-border grid grid-cols-1 border-b pt-12 pb-18 max-md:gap-12 md:grid-cols-2 md:pt-18 md:pb-24">
        <div className="border-border flex flex-col border-y md:border-r">
          <Image
            src="/join-us/team-light.png"
            alt=""
            width={600}
            height={600}
            className="mx-auto h-auto w-full max-w-150 object-contain dark:hidden"
          />
          <Image
            src="/join-us/team-dark.png"
            alt=""
            width={600}
            height={600}
            className="mx-auto hidden h-auto w-full max-w-150 object-contain dark:block"
          />

          <h2 className="my-4 px-4 text-center text-2xl font-semibold text-[#1F1F1F] dark:text-[#E6E6E6]">
            Bluethroat Team
          </h2>

          <p className="mx-auto mb-auto max-w-138 px-4 text-center text-base font-medium text-[#454545] dark:text-[#8F8F8F]">
            A focused group working hands-on to build Bluethroat. Take
            ownership, collaborate closely, and contribute consistently.
          </p>

          <Link
            className="hover:bg-foreground border-border mt-12 flex h-18 items-center justify-center border-t px-2 text-center text-xl font-semibold text-[#1F1F1F] hover:text-[#EBEBEB] dark:text-[#EBEBEB] dark:hover:text-[#292929]"
            href="mailto:saxenism@bluethroatlabs.com"
          >
            Send us a short intro
          </Link>
        </div>

        <div className="border-border flex flex-col border-y">
          <Image
            src="/join-us/basecamp-light.png"
            alt=""
            width={600}
            height={600}
            className="mx-auto h-auto w-full max-w-150 object-contain dark:hidden"
          />
          <Image
            src="/join-us/basecamp-dark.png"
            alt=""
            width={600}
            height={600}
            className="mx-auto hidden h-auto w-full max-w-150 object-contain dark:block"
          />

          <h2 className="my-4 px-4 text-center text-2xl font-semibold text-[#1F1F1F] dark:text-[#E6E6E6]">
            Bluethroat Basecamp
          </h2>

          <p className="mx-auto mb-auto max-w-138 px-4 text-center text-base font-medium text-[#454545] dark:text-[#8F8F8F]">
            An open space to explore, experiment, and collaborate. A Private
            Telegram group where we share research, updates, and opportunities
            to work with us
          </p>

          <Link
            className="hover:bg-foreground border-border mt-12 flex h-18 items-center justify-center border-t px-2 text-center text-xl font-semibold text-[#1F1F1F] hover:text-[#EBEBEB] dark:text-[#EBEBEB] dark:hover:text-[#292929]"
            href="https://t.me/+VtIQ2JfXDalmZDE1"
            target="_blank"
          >
            Enter Basecamp
          </Link>
        </div>
      </div>
    </section>
  )
}
