import Image from 'next/image'

export const LandingStripImage = () => {
  return (
    <>
      <Image
        src="/landing/footer-bg-light.png"
        alt="Footer"
        fill
        className="object-cover md:object-[100%_40%] dark:hidden"
        priority
      />
      <Image
        src="/landing/footer-bg-dark.png"
        alt="Footer"
        fill
        className="hidden object-cover md:object-[100%_40%] dark:block"
        priority
      />
    </>
  )
}
