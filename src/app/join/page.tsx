import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { JoinUsSection } from '@/components/sections/join-us-section'

export default function JoinUsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="bg-background border-border relative mx-auto min-h-screen max-w-[1300px] border-x">
        <StickyNavbar />
        <main className="pt-24 font-mono">
          <JoinUsSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}
