import { defineField, defineType } from 'sanity'

const organization = defineType({
  name: 'organization',
  title: 'Organizations',
  type: 'document',
  description: 'Reusable company, protocol, and project details.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo (Dark Mode)',
      type: 'image',
      description:
        'Shown in dark mode and used as the fallback when no light-mode logo is provided.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lightLogo',
      title: 'Logo (Light Mode)',
      type: 'image',
      description:
        'Shown in light mode. Leave empty to reuse the dark-mode logo.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Name (A–Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'name', subtitle: 'website', media: 'logo' } },
})

export default organization
