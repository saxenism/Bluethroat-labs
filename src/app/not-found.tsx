import type { Metadata } from 'next'
import { NotFoundExperience } from '@/components/not-found/not-found-experience'

export const metadata: Metadata = {
  title: { absolute: 'Bluethroat Labs' },
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundExperience />
}
