import { cn } from '@/lib/utils'
import Image from 'next-export-optimize-images/image'
import { ReactNode } from 'react'

interface GridBackgroundProps {
  children: ReactNode
  id?: string
  className?: string
  backgroundImage?: string
  overlay?: ReactNode
}

export function GridBackground({
  children,
  id,
  className = '',
  backgroundImage,
  overlay,
}: GridBackgroundProps) {
  return (
    <div id={id} className={cn('relative', className)}>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover opacity-50"
        />
      )}
      {overlay}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
