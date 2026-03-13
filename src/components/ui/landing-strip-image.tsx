import { ImageWithBlur } from '@/components/ui/image-with-blur'

export async function LandingStripImage() {
  return (
    <>
      <ImageWithBlur
        src="/landing/footer-bg-light.png"
        alt="Footer"
        fill
        className="object-cover md:object-[100%_40%] dark:hidden"
        preload
      />
      <ImageWithBlur
        src="/landing/footer-bg-dark.png"
        alt="Footer"
        fill
        className="hidden object-cover md:object-[100%_40%] dark:block"
        preload
      />
    </>
  )
}
