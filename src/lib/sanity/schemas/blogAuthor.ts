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
      description: 'Example: Rahul Saxena',
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: 'socialHandle',
      title: 'Social Handle',
      type: 'string',
      description: 'Example: @saxenism',
    },
    {
      name: 'socialLink',
      title: 'Social Link',
      type: 'url',
      description: 'Profile URL for the handle (e.g. https://x.com/saxenism)',
      validation: (Rule: { uri: (options: { scheme: string[] }) => unknown }) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    },
  ],
}

export default blogAuthor
