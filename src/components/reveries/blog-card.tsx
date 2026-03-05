import { BlogItem } from '@/lib/sanity/reveries'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  blog: BlogItem
  variant?: 'list' | 'grid'
  className?: string
}

export const BlogCard = ({
  blog,
  variant = 'list',
  className,
}: BlogCardProps) => {
  if (variant === 'grid') {
    return (
      <Link
        href={blog.href}
        className={cn(
          'group border-border flex h-full flex-col border-r border-b bg-transparent p-6 hover:bg-[#f2f2f2] dark:hover:bg-[#191919]',
          className
        )}
      >
        <Image
          src={blog.src || '/landing/hero-bg.png'}
          alt={blog.title}
          width={600}
          height={337}
          className="mb-6 h-49.5 w-full object-cover md:mb-8 md:aspect-video md:h-auto"
        />

        <div className="mb-auto flex items-start justify-between gap-4">
          <h3 className="text-xl leading-snug font-semibold">{blog.title}</h3>
          <div className="border-border group-hover:bg-foreground grid size-14 shrink-0 place-items-center border max-md:hidden">
            <ArrowUpRightIcon className="size-10 text-[#292929] group-hover:text-[#EBEBEB] dark:text-[#E6E6E6] dark:group-hover:text-[#292929]" />
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2 text-base font-medium text-[#777777] md:mt-12 dark:text-[#CACACA]">
          <span>{blog.category}</span>
          <span className="text-xl leading-none">•</span>
          <span>{blog.date}</span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={blog.href}
      className={cn(
        'group border-border flex items-stretch border-b bg-transparent hover:bg-[#f2f2f2] dark:hover:bg-[#191919]',
        className
      )}
    >
      <div className="flex flex-1 flex-col items-start gap-6 p-6 md:flex-row md:items-center md:p-12">
        <Image
          src={blog.src || '/landing/hero-bg.png'}
          alt={blog.title}
          width={212}
          height={120}
          className="h-49.5 w-full object-cover md:h-30 md:w-53"
        />

        <div className="flex-1 align-text-top">
          <h3 className="mb-10 text-xl leading-snug font-semibold">
            {blog.title}
          </h3>

          <div className="flex items-center gap-2 text-base font-medium text-[#777777] dark:text-[#CACACA]">
            <span>{blog.category}</span>
            <span className="text-xl leading-none">•</span>
            <span>{blog.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-end max-md:hidden">
        <div className="border-border group-hover:bg-foreground grid size-18 place-items-center border-b border-l">
          <ArrowUpRightIcon className="size-15 text-[#292929] group-hover:text-[#EBEBEB] dark:text-[#E6E6E6] dark:group-hover:text-[#292929]" />
        </div>
      </div>
    </Link>
  )
}
