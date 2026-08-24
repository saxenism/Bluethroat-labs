import { defineArrayMember, defineField, defineType } from 'sanity'

const severityOptions = [
  { title: 'Critical', value: 'critical' },
  { title: 'High', value: 'high' },
  { title: 'Medium', value: 'medium' },
  { title: 'Low', value: 'low' },
]

const severityField = defineField({
  name: 'severity',
  title: 'Severity',
  type: 'string',
  options: { list: severityOptions, layout: 'radio' },
  validation: (Rule) => Rule.required(),
})

const logoField = defineField({
  name: 'logo',
  title: 'Organization Logo (Dark Mode)',
  type: 'image',
  description:
    'Shown in dark mode and used as the fallback when no light-mode logo is provided.',
  options: { hotspot: true },
})

const lightLogoField = defineField({
  name: 'lightLogo',
  title: 'Organization Logo (Light Mode)',
  type: 'image',
  description: 'Shown in light mode. Leave empty to reuse the dark-mode logo.',
  options: { hotspot: true },
})

const proofOfWork = defineType({
  name: 'proofOfWork',
  title: 'Proof of Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Proof of Work',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'severityNote',
      title: 'Severity Note',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'confidentialityNote',
      title: 'Confidentiality Note',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Finding Stats',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'totalFindings',
          title: 'Total Findings',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'criticalFindings',
          title: 'Critical Findings',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'highFindings',
          title: 'High Findings',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'mediumFindings',
          title: 'Medium Findings',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'lowFindings',
          title: 'Low Findings',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
      ],
    }),
    defineField({
      name: 'featuredFindings',
      title: 'Featured Findings',
      type: 'array',
      description: 'Drag cards to control their order in the carousel.',
      options: { sortable: true },
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'featuredFinding',
          title: 'Carousel Finding',
          type: 'object',
          fields: [
            logoField,
            lightLogoField,
            defineField({
              name: 'name',
              title: 'Organization or Identifier',
              type: 'string',
              description: 'For example, “Secret Network” or “CVE-2026-22696”.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            severityField,
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Analysis Link',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: true }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              name: 'name',
              severity: 'severity',
              media: 'logo',
            },
            prepare({ title, name, severity, media }) {
              return {
                title: title || 'Untitled finding',
                subtitle: [name, severity].filter(Boolean).join(' · '),
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'findings',
      title: 'All Findings',
      type: 'array',
      description: 'Drag findings to control their order in the full list.',
      options: { sortable: true },
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'finding',
          title: 'Finding',
          type: 'object',
          fields: [
            severityField,
            defineField({
              name: 'severityLabel',
              title: 'Custom Severity Label',
              type: 'string',
              description:
                'Optional label shown instead of the standard severity name.',
            }),
            defineField({
              name: 'organization',
              title: 'Organization',
              type: 'string',
              description: 'Leave empty for a confidential finding.',
            }),
            logoField,
            lightLogoField,
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              options: { layout: 'tags' },
              validation: (Rule) => Rule.required().min(1).unique(),
            }),
            defineField({
              name: 'url',
              title: 'Analysis URL',
              type: 'url',
              description: 'Leave empty when the finding is confidential.',
              validation: (Rule) => Rule.uri({ allowRelative: true }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              id: 'id',
              organization: 'organization',
              severity: 'severity',
              media: 'logo',
            },
            prepare({ title, id, organization, severity, media }) {
              return {
                title: title || 'Untitled finding',
                subtitle: [id, organization || 'Confidential', severity]
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
    select: { title: 'title', totalFindings: 'stats.totalFindings' },
    prepare({
      title,
      totalFindings,
    }: {
      title?: string
      totalFindings?: number
    }) {
      return {
        title: title || 'Proof of Work',
        subtitle:
          typeof totalFindings === 'number'
            ? `${totalFindings} findings`
            : 'Stats not configured',
      }
    },
  },
})

export default proofOfWork
