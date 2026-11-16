import { defineArrayMember, defineField, defineType } from 'sanity'

const announcements = defineType({
  name: 'announcements',
  title: 'Announcements',
  type: 'document',
  description: 'The rotating strip above the main site navigation.',
  initialValue: { enabled: true, items: [] },
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show Announcement Strip',
      type: 'boolean',
      initialValue: true,
      description:
        'Turn off to hide the entire strip without deleting its items.',
    }),
    defineField({
      name: 'items',
      title: 'Announcements',
      type: 'array',
      description: 'Drag items to set their rotation order.',
      options: { sortable: true },
      of: [
        defineArrayMember({
          name: 'announcement',
          title: 'Announcement',
          type: 'object',
          initialValue: { enabled: true },
          fields: [
            defineField({
              name: 'enabled',
              title: 'Show This Announcement',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'organization',
              title: 'Organization',
              type: 'reference',
              to: [{ type: 'organization' }],
              description:
                'Uses the organization’s name and logos. The strip automatically picks the logo for its inverted theme.',
            }),
            defineField({
              name: 'tag',
              title: 'Text Label',
              type: 'string',
              description:
                'Shown when no organization logo is available, for example “Shipped” or “Field Notes”.',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { organization?: { _ref?: string } }
                    | undefined
                  return value?.trim() || parent?.organization?._ref
                    ? true
                    : 'Choose an organization or enter a text label.'
                }),
            }),
            defineField({
              name: 'text',
              title: 'Main Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mobileText',
              title: 'Mobile Text',
              type: 'string',
              description: 'Short copy used on phones and in narrower layouts.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'url',
              description:
                'Optional. Add a full URL or a site path such as /tools-and-research to make the announcement clickable.',
              validation: (Rule) =>
                Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'cta',
              title: 'Button Text',
              type: 'string',
              description: 'Shown only when the announcement has a link.',
              hidden: ({ parent }) => !parent?.href,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { href?: string } | undefined
                  return !parent?.href?.trim() || value?.trim()
                    ? true
                    : 'Enter button text for the announcement link.'
                }),
            }),
            defineField({
              name: 'interval',
              title: 'Display Interval (ms)',
              type: 'number',
              description:
                'Optional. Leave empty for 5 seconds; 10000 is 10 seconds.',
              validation: (Rule) => Rule.integer().min(1).max(2147483647),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              tag: 'tag',
              organization: 'organization.name',
              media: 'organization.logo',
              enabled: 'enabled',
            },
            prepare({ title, tag, organization, media, enabled }) {
              return {
                title: title || 'New announcement',
                subtitle: [organization || tag, enabled === false && 'Hidden']
                  .filter(Boolean)
                  .join(' · '),
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { enabled: 'enabled', items: 'items' },
    prepare({ enabled, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Announcements',
        subtitle: enabled === false ? 'Hidden' : `${count} announcements`,
      }
    },
  },
})

export default announcements
