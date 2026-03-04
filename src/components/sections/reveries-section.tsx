import Link from 'next/link'
import Image from 'next-export-optimize-images/image'
import type { BlogItem } from '@/lib/sanity/reveries'
import { BlogCard } from '@/components/reveries/blog-card'

interface ReveriesSectionProps {
  blogs: BlogItem[]
}

export function ReveriesSection({ blogs }: ReveriesSectionProps) {
  return (
    <section
      id="reveries"
      className="border-border relative isolate border-b py-16"
    >
      <div className="border-border border-b">
        <div className="border-border flex h-16 border-y bg-[#F2F2F2] px-0 dark:bg-[#191919]">
          <div className="border-border flex h-full items-center border-r px-4 md:px-12">
            <span className="text-xl font-semibold whitespace-nowrap uppercase md:text-2xl">
              Reveries
            </span>
          </div>

          <div className="none relative h-full flex-1 overflow-hidden">
            <Image
              src="/landing/footer-bg-light.png"
              alt="Footer"
              fill
              className="object-cover dark:hidden"
            />
            <Image
              src="/landing/footer-bg-dark.png"
              alt="Footer"
              fill
              className="hidden object-cover dark:block"
            />
          </div>
        </div>

        <div className="border-border mt-12 border-t">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>

        <div className="flex w-full items-center md:justify-end">
          <Link
            href="/reveries"
            className="group-hover:text-secondary hover:bg-foreground md:border-border flex h-18 w-full items-center justify-center p-5 text-xl font-semibold text-[#1F1F1F] hover:text-[#EBEBEB] md:w-auto md:border-l md:px-30 dark:text-[#EBEBEB] dark:hover:text-[#292929]"
          >
            Checkout Blogs
          </Link>
        </div>
      </div>
    </section>
  )
}
