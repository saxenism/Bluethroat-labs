import type { ReactNode } from 'react'
import { AnnouncementStrip } from './announcement-strip'
import { client } from '@/lib/sanity/client'
import {
  ANNOUNCEMENTS_QUERY,
  mapSanityAnnouncementToItem,
  type SanityAnnouncements,
} from '@/lib/sanity/announcements'

export async function SiteShell({ children }: { children: ReactNode }) {
  const data = await client.fetch<SanityAnnouncements | null>(
    ANNOUNCEMENTS_QUERY,
    {},
    { next: { revalidate: 60, tags: ['announcements'] } }
  )
  const announcements = data?.enabled
    ? data.items.map(mapSanityAnnouncementToItem)
    : []

  return (
    <>
      {announcements.length > 0 && (
        <AnnouncementStrip key={data?._rev} announcements={announcements} />
      )}
      <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12 peer-data-[state=open]/announcements:pt-8 in-data-[announcements-dismissed=true]:pt-12">
        {children}
      </div>
    </>
  )
}
