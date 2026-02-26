const docNavigation = {
  name: 'docNavigation',
  title: 'Documentation Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      readOnly: true,
    },
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navItem' }],
    },
  ],
}

export default docNavigation
