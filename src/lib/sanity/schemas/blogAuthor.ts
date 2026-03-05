import type { StringRule } from '@sanity/types'

const blogAuthor = {
  name: 'blogAuthor',
  title: 'Blog Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    },
  ],
}

export default blogAuthor
