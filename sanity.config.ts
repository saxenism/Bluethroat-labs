import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from '@/lib/sanity/schemas'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Bluethroat Labs',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'writeup'
            ),
            orderableDocumentListDeskItem({
              type: 'writeup',
              title: 'Writeups',
              S,
              context,
            }),
          ]),
    }),
    visionTool(),
    codeInput(),
    media(),
  ],

  schema: { types: schemaTypes },
})
