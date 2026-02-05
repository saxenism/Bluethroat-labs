export default {
    name: 'docNavigation',
    title: 'Documentation Navigation',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Main Navigation',
            readOnly: true
        },
        {
            name: 'items',
            title: 'Navigation Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'navItem',
                    title: 'Navigation Item',
                    fields: [
                        { name: 'title', title: 'Display Title', type: 'string' },
                        {
                            name: 'doc',
                            title: 'Linked Document',
                            type: 'reference',
                            to: [{ type: 'doc' }]
                        },
                        {
                            name: 'items',
                            title: 'Sub Items',
                            type: 'array',
                            of: [{ type: 'navItem' }]
                        }
                    ]
                }
            ]
        }
    ]
};
