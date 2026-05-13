import Image from 'next/image'

export const LandingStripImage = () => {
  return (
    <>
      <Image
        src="/landing/footer-bg-light.png"
        alt=""
        fill
        className="object-cover md:object-[100%_40%] dark:hidden"
        priority
      />
      <Image
        src="/landing/footer-bg-dark.png"
        alt=""
        fill
        className="hidden object-cover md:object-[100%_40%] dark:block"
        priority
      />
    </>
  )
}
