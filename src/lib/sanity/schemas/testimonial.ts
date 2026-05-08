import type { StringRule } from '@sanity/types'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { MarkdownEditorInput } from '@/lib/sanity/components/markdown-editor-input'

const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'review',
      title: 'Review',
      type: 'string',
      components: { input: MarkdownEditorInput },
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'person',
      title: 'Person',
      type: 'object',
      validation: (Rule: StringRule) => Rule.required(),
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule: StringRule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          validation: (Rule: StringRule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'xUrl',
          title: 'X URL',
          type: 'url',
          description: 'Optional X profile URL for social icon.',
        },
      ],
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'object',
      fields: [
        {
          name: 'light',
          title: 'Light Theme Logo',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule: StringRule) => Rule.required(),
        },
        {
          name: 'dark',
          title: 'Dark Theme Logo',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule: StringRule) => Rule.required(),
        },
      ],
      validation: (Rule: StringRule) => Rule.required(),
    },
    orderRankField({ type: 'testimonial' }),
  ],
}

export default testimonial
