/** Collect all doc reference IDs from the nav tree (recursive). */
function collectDocRefs(
  items: Array<{ doc?: { _ref?: string }; items?: unknown[] }> | undefined
): string[] {
  if (!items || !Array.isArray(items)) return []
  const refs: string[] = []
  for (const item of items) {
    if (item?.doc?._ref) refs.push(item.doc._ref)
    refs.push(
      ...collectDocRefs(
        item?.items as
          | Array<{ doc?: { _ref?: string }; items?: unknown[] }>
          | undefined
      )
    )
  }
  return refs
}

const navItem = {
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'doc',
      title: 'Document',
      type: 'reference',
      to: [{ type: 'doc' }],
      description:
        'Pick an existing doc. Order and nesting are controlled by drag-and-drop below.',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
      options: {
        filter: ({
          document,
          parent,
        }: {
          document?: {
            items?: Array<{ doc?: { _ref?: string }; items?: unknown[] }>
          }
          parent?: { doc?: { _ref?: string } }
        }) => {
          const usedRefs = collectDocRefs(document?.items) || []
          const currentRef = parent?.doc?._ref
          const excludeRefs = currentRef
            ? usedRefs.filter((r) => r !== currentRef)
            : usedRefs
          return {
            filter: excludeRefs.length ? '!(_id in $excludeRefs)' : undefined,
            params: excludeRefs.length ? { excludeRefs } : undefined,
          }
        },
      },
    },
    {
      name: 'title',
      title: 'Display Title (optional)',
      type: 'string',
      description: 'Leave empty to use the document’s title.',
    },
    {
      name: 'items',
      title: 'Children',
      type: 'array',
      of: [{ type: 'navItem' }],
      description:
        'Nested items. Drag to reorder; drag items here to create hierarchy.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      docTitle: 'doc.title',
      docSlug: 'doc.slug.current',
    },
    prepare({
      title,
      docTitle,
      docSlug,
    }: {
      title?: string
      docTitle?: string
      docSlug?: string
    }) {
      const label = title || docTitle || 'Untitled'
      const subtitle = docSlug ? `/docs/${docSlug}` : 'No document linked'
      return { title: label, subtitle }
    },
  },
}

export default navItem
