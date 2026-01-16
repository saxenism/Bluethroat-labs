import { StickyNavbar } from '@/components/layout/sticky-navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { MissionSection } from '@/components/sections/mission-section';
import { WorkSection } from '@/components/sections/work-section';
import { PhilosophySection } from '@/components/sections/philosophy-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-[1300px] mx-auto bg-background border-x border-border min-h-screen relative">
        <StickyNavbar />
        <main className="pt-16">
          <HeroSection />
          <MissionSection />
          <WorkSection />
          <PhilosophySection />
        </main>
      </div>
    </div>
  );
}
