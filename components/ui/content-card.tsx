import React from 'react'
import Link from 'next/link'

interface ContentCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  buttonText?: string
  className?: string
}

export function ContentCard({
  title,
  description,
  icon,
  href,
  buttonText,
  className = '',
}: ContentCardProps) {
  return (
    <div
      className={`group border-border bg-card hover:border-foreground/20 relative border p-8 transition-all ${className}`}
    >
      {/* Grid line decoration */}

      {icon && <div className="text-foreground/60 mb-6">{icon}</div>}

      <h3 className="mb-4 font-mono text-base font-medium sm:text-lg">
        {title}
      </h3>

      <p className="text-foreground/70 mb-6 font-mono text-sm leading-relaxed">
        {description}
      </p>

      {href && buttonText && (
        <Link
          href={href}
          className="bg-foreground text-background inline-flex items-center px-6 py-3 font-mono text-sm transition-opacity hover:opacity-90"
        >
          {buttonText}
        </Link>
      )}
    </div>
  )
}
