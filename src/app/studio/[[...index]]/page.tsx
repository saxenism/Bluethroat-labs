'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/../sanity.config'
import '@uiw/react-md-editor/markdown-editor.css'
import '../markdown-editor-overrides.css'

export default function StudioPage() {
  return <NextStudio config={config} />
}
