import React from 'react'

interface SectionHeaderProps {
  title: string
  className?: string
}

export function SectionHeader({ title, className = '' }: SectionHeaderProps) {
  return (
    <div className={`relative ${className}`}>
      <h2 className="font-mono text-xs font-medium tracking-widest uppercase sm:text-sm">
        {title}
      </h2>
      <div className="bg-border absolute top-1/2 -right-full h-px w-screen opacity-50" />
    </div>
  )
}
