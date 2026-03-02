import type { StringRule } from '@sanity/types'
import { MarkdownEditorInput } from '@/lib/sanity/components/markdown-editor-input'

const blog = {
  name: 'blog',
  title: 'Blog',
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
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'TEE Security', value: 'TEE Security' },
          { title: 'General', value: 'General' },
        ],
      },
    },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    {
      name: 'content',
      title: 'Content',
      type: 'string',
      components: { input: MarkdownEditorInput },
      validation: (Rule: StringRule) => Rule.required(),
    },
  ],
}

export default blog
