import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FindingLogoProps {
  logo: string | null
  lightLogo: string | null
  alt: string
  width: number
  height: number
  className?: string
}

export const FindingLogo = ({
  logo,
  lightLogo,
  alt,
  width,
  height,
  className,
}: FindingLogoProps) => {
  const fallbackLogo = logo ?? lightLogo

  if (!fallbackLogo) return null

  if (!logo || !lightLogo) {
    return (
      <Image
        src={fallbackLogo}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={className}
      />
    )
  }

  return (
    <>
      <Image
        src={lightLogo}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={cn(className, 'dark:hidden')}
      />
      <Image
        src={logo}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={cn(className, 'hidden dark:block')}
      />
    </>
  )
}
