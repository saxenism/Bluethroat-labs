import type { StringRule } from '@sanity/types'

const blogCategory = {
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    },
  ],
}

export default blogCategory
