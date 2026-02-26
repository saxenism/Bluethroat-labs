import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GridBackgroundProps {
  children: ReactNode
  id?: string
  className?: string
  withNoise?: boolean
  backgroundImage?: string
  withCross?: boolean
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
    <div
      id={id}
      className={cn('relative', className)}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {overlay}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
