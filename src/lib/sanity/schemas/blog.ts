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
      type: 'reference',
      to: [{ type: 'blogCategory' }],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'blogAuthor' }],
    },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    {
      name: 'content',
      title: 'Content',
      type: 'string',
      components: { input: MarkdownEditorInput },
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description:
            'Overrides the post title in search results. Leave blank to use the post title.',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description:
            'Short description shown in search results (150–160 chars recommended).',
        },
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
        {
          name: 'bannerImage',
          title: 'SEO Banner Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Used for Open Graph / social sharing.',
        },
      ],
    },
  ],
}

export default blog
