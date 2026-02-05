export default {
    name: 'navItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Display Title',
            type: 'string'
        },
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
};
