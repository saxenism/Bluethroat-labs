import type { StringRule } from '@sanity/types'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { MarkdownEditorInput } from '@/lib/sanity/components/markdown-editor-input'

const writeupSeries = {
  name: 'writeupSeries',
  title: 'Writeup Series',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Small logo or icon associated with this writeup series.',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Cover image associated with this writeup series.',
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      components: { input: MarkdownEditorInput },
      description: 'Rich content description of the writeup series.',
    },
    orderRankField({ type: 'writeupSeries' }),
  ],
}

export default writeupSeries
