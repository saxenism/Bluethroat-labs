import { MarkdownRenderer } from '@/components/markdown'
import { createElement, type ReactNode } from 'react'

export interface SanityTestimonial {
  name: string
  review: string
  person: {
    name: string
    role: string
    exRole?: string
    email?: string
    xUrl?: string
    image?: { asset: { _ref: string; _type: string } }
  }
  logo?: {
    light?: { asset: { _ref: string; _type: string } }
    dark?: { asset: { _ref: string; _type: string } }
  }
}

export interface TestimonialItem {
  name: string
  review: ReactNode
  personName: string
  role: string
  image: string | null
  email?: string
  xUrl?: string
  logo: { light: string | null; dark: string | null }
}

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(orderRank asc) {
  name,
  review,
  person {
    name,
    role,
    xUrl,
    image
  },
  logo {
    light,
    dark
  }
}`

export const mapSanityTestimonialToItem = (
  testimonial: SanityTestimonial,
  urlFor: (src: unknown) => { url: () => string }
): TestimonialItem => {
  return {
    name: testimonial.name,
    review: testimonial.review
      ? createElement(MarkdownRenderer, { content: testimonial.review })
      : '',
    personName: testimonial.person.name,
    role: testimonial.person.role,
    image: testimonial.person.image
      ? urlFor(testimonial.person.image).url()
      : null,
    xUrl: testimonial.person.xUrl,
    logo: {
      light: testimonial.logo?.light
        ? urlFor(testimonial.logo.light).url()
        : null,
      dark: testimonial.logo?.dark ? urlFor(testimonial.logo.dark).url() : null,
    },
  }
}
