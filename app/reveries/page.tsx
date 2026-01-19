import { StickyNavbar } from '@/components/layout/sticky-navbar';
import { Footer } from '@/components/layout/footer';
import { ReveriesCatalog } from '@/components/sections/reveries-catalog';

export default function ReveriesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <div className="max-w-[1300px] mx-auto bg-background border-x border-border min-h-screen relative">
                <StickyNavbar />
                <main className="pt-24 font-mono">
                    <ReveriesCatalog />
                    <Footer />
                </main>
            </div>
        </div>
    );
}
