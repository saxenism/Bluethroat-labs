import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { JoinUsSection } from '@/components/sections/join-us-section'

export default function JoinUsPage() {
  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <StickyNavbar />
      <main className="font-mono">
        <JoinUsSection />
        <Footer />
      </main>
    </div>
  )
}
