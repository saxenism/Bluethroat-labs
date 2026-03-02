const docNavigation = {
  name: 'docNavigation',
  title: 'Documentation Navigation',
  type: 'document',
  description:
    'Order and hierarchy of docs in the sidebar. Add items by linking existing docs; drag to reorder and nest under "Children".',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'items',
      title: 'Sidebar items',
      type: 'array',
      of: [{ type: 'navItem' }],
      description:
        'Add docs from your Documentation list. Drag to reorder; expand an item and add "Children" for sub-sections.',
    },
  ],
  preview: {
    select: { count: 'items.length' },
    prepare({ count }: { count?: number }) {
      return {
        title: 'Documentation Navigation',
        subtitle: count ? `${count} item(s)` : 'No items',
      }
    },
  },
}

export default docNavigation
