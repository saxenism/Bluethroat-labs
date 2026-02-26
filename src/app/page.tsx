import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { MissionSection } from '@/components/sections/mission-section'
import { WorkSection } from '@/components/sections/work-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { ReveriesSection } from '@/components/sections/reveries-section'
import { TeamSection } from '@/components/sections/team-section'
import { Footer } from '@/components/layout/footer'
import { TeeSection } from '@/components/sections/tee-section'

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-black">
      <div className="bg-background border-border relative mx-auto min-h-screen max-w-[1300px] border-x">
        <StickyNavbar />
        <main className="pt-24 font-mono">
          <HeroSection />
          <MissionSection />
          <TeeSection />
          <PhilosophySection />
          <WorkSection />
          <ReveriesSection />
          <TeamSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}
