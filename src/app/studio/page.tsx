'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/../sanity.config'
import '@uiw/react-md-editor/markdown-editor.css'
import './markdown-editor-overrides.css'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} history="hash" />
}
