export type Announcement = {
  logo?: string
  lightLogo?: string
  logoAlt?: string
  tag?: string
  href?: string
  text: string
  mobileText: string
  cta?: string
  /** Display time in milliseconds; defaults to 5000. */
  interval?: number
}

export interface SanityAnnouncement {
  _key: string
  organization: {
    name: string
    logo: string | null
    lightLogo: string | null
  } | null
  tag: string | null
  href: string | null
  text: string
  mobileText: string
  cta: string | null
  interval: number | null
}

export interface SanityAnnouncements {
  _rev: string
  enabled: boolean
  items: SanityAnnouncement[]
}

export const ANNOUNCEMENTS_QUERY = `*[_type == "announcements" && _id == "announcements"][0] {
  _rev,
  "enabled": coalesce(enabled, true),
  "items": coalesce(items[enabled != false] {
    _key,
    organization-> {
      name,
      "logo": logo.asset->url,
      "lightLogo": lightLogo.asset->url
    },
    tag,
    href,
    text,
    mobileText,
    cta,
    interval
  }, [])
}`

export function mapSanityAnnouncementToItem(
  item: SanityAnnouncement
): Announcement {
  const href = item.href?.trim() || undefined

  return {
    logo: item.organization?.logo ?? item.organization?.lightLogo ?? undefined,
    lightLogo:
      item.organization?.lightLogo ?? item.organization?.logo ?? undefined,
    logoAlt: item.organization?.name,
    tag: item.tag ?? item.organization?.name ?? undefined,
    href,
    text: item.text,
    mobileText: item.mobileText,
    cta: href ? item.cta?.trim() || undefined : undefined,
    interval: item.interval ?? undefined,
  }
}
