import type { StringRule } from '@sanity/types'
import { MarkdownEditorInput } from '@/lib/sanity/components/markdown-editor-input'

const doc = {
  name: 'doc',
  title: 'Documentation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'string',
      components: { input: MarkdownEditorInput },
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
  ],
}

export default doc
