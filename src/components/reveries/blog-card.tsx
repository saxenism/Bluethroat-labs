import { BlogItem } from '@/lib/sanity/reveries'
import { ArrowUpRightIcon } from 'lucide-react'
import RemoteImage from 'next-export-optimize-images/remote-image'
import Link from 'next/link'

export const BlogCard = ({ blog }: { blog: BlogItem }) => {
  return (
    <Link
      href={blog.href}
      className="group border-border flex items-stretch border-b bg-transparent hover:bg-[#f2f2f2] dark:hover:bg-[#191919]"
    >
      <div className="flex flex-1 flex-col items-start gap-6 p-6 md:flex-row md:items-center md:p-12">
        <RemoteImage
          src={blog.src || '/landing/hero-bg.png'}
          alt={blog.title}
          width={212}
          height={120}
          className="h-49.5 w-full object-cover md:h-30 md:w-53"
        />

        <div className="flex-1 align-text-top">
          <h3 className="mb-10 text-xl leading-snug font-bold">{blog.title}</h3>

          <div className="flex items-center gap-2 text-base font-medium text-[#777777] dark:text-[#CACACA]">
            <span>{blog.category}</span>
            <span className="text-2xl leading-none">•</span>
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
