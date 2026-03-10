'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import * as runtime from 'react/jsx-runtime'
import { createPortal } from 'react-dom'
import type { StringInputProps } from 'sanity'
import { set, unset } from 'sanity'
import MDEditor, {
  type MDEditorProps,
  type RefMDEditor,
  type PreviewType,
} from '@uiw/react-md-editor'
import { evaluate } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { markdownComponents } from '@/components/markdown/markdown-components'
import type { MDXComponents } from 'mdx/types'

const EDITOR_PROPS: Partial<MDEditorProps> = {
  height: 320,
  preview: 'edit' as const,
  visibleDragbar: false,
  enableScroll: true,
  textareaProps: {
    placeholder: 'Write in Markdown…',
    'aria-label': 'Markdown content',
  },
  components: { preview: (source) => <MarkdownPreview content={source} /> },
}

// Studio-safe overrides: replace StyledCodeBlock (which uses next-themes) with plain pre/code
const studioComponents: MDXComponents = {
  ...markdownComponents,
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded bg-[#1F1F1F] p-4 font-mono text-sm text-[#CACACA]">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    if (className?.includes('language-')) return <code>{children}</code>
    return (
      <code className="bg-[#E6E6E6] px-2 py-1 text-base text-[#7D7D7D] dark:bg-[#292929]">
        {children}
      </code>
    )
  },
}

function MarkdownPreview({ content }: { content: string }) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType<{
    components: MDXComponents
  }> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!content?.trim()) {
      setMDXContent(null)
      setError(null)
      return
    }
    let cancelled = false
    evaluate(content, {
      ...(runtime as Parameters<typeof evaluate>[1]),
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSanitize],
    })
      .then(({ default: Comp }) => {
        if (!cancelled) {
          setMDXContent(
            () => Comp as React.ComponentType<{ components: MDXComponents }>
          )
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : String(err))
      })
    return () => {
      cancelled = true
    }
  }, [content])

  if (error) {
    return (
      <div className="p-4 font-mono text-sm text-red-400">
        Parse error: {error}
      </div>
    )
  }

  if (!MDXContent) {
    return (
      <div className="p-4 text-sm text-[#7D7D7D]">
        {content?.trim() ? 'Rendering…' : 'Nothing to preview.'}
      </div>
    )
  }

  return (
    <div className="bg-background p-4 wrap-break-word">
      <MDXContent components={studioComponents} />
    </div>
  )
}

const PORTAL_CONTAINER_ID = 'sanity-markdown-editor-portal-root'

/**
 * Get or create the portal container. Prefer placing it as a sibling of
 * data-testid="document-panel-portal" so we sit in the same stacking context;
 * otherwise append to document.body.
 */
function getOrCreatePortalContainer(): HTMLDivElement {
  let el = document.getElementById(PORTAL_CONTAINER_ID) as HTMLDivElement | null
  if (el) return el
  const sibling = document.querySelector<HTMLElement>(
    '[data-testid="document-panel-portal"]'
  )
  el = document.createElement('div')
  el.id = PORTAL_CONTAINER_ID
  if (sibling?.parentElement) {
    sibling.parentElement.insertBefore(el, sibling.nextSibling)
  } else {
    document.body.appendChild(el)
  }
  return el
}

/**
 * Custom markdown field input using @uiw/react-md-editor.
 * Fullscreen opens in a portal: sibling of document-panel-portal when present, else body. Escape exits.
 */
export function MarkdownEditorInput(props: StringInputProps) {
  const { value = '', onChange, readOnly } = props
  const editorRef = useRef<RefMDEditor>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [previewMode, setPreviewMode] = useState<PreviewType>('edit')
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  )
  const isFullscreenRef = useRef(false)
  const portalContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    isFullscreenRef.current = isFullscreen
  }, [isFullscreen])

  const handleChange = useCallback(
    (val: string | undefined) => {
      onChange(val ? set(val) : unset())
    },
    [onChange]
  )

  // When fullscreen is true, ensure we have a portal container (sibling of document-panel-portal or body)
  useLayoutEffect(() => {
    if (!isFullscreen) return
    if (portalContainerRef.current) {
      setPortalContainer(portalContainerRef.current)
      return
    }
    const container = getOrCreatePortalContainer()
    portalContainerRef.current = container
    setPortalContainer(container)
  }, [isFullscreen])

  // Sync fullscreen and previewMode from editor internal state into React state
  useEffect(() => {
    const interval = setInterval(() => {
      const ref = editorRef.current
      const fullscreen = ref?.fullscreen ?? false
      if (fullscreen && !isFullscreenRef.current) setIsFullscreen(true)
      if (!fullscreen && isFullscreenRef.current) setIsFullscreen(false)
      const mode = ref?.preview
      if (mode) setPreviewMode((prev) => (prev !== mode ? mode : prev))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // Escape: exit portal fullscreen or library fullscreen
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (isFullscreenRef.current) {
        setIsFullscreen(false)
        e.preventDefault()
        return
      }
      const ref = editorRef.current
      if (ref?.fullscreen && ref?.dispatch) {
        ref.dispatch({ fullscreen: false })
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const editor = (
    <MDEditor
      ref={editorRef}
      value={value}
      onChange={handleChange}
      {...EDITOR_PROPS}
      preview={previewMode}
      hideToolbar={readOnly}
      fullscreen={isFullscreen}
      overflow
    />
  )

  const target =
    portalContainer ?? (typeof document !== 'undefined' ? document.body : null)

  return (
    <>
      <div className="sanity-markdown-editor" data-color-mode="dark">
        {editor}
      </div>

      {isFullscreen &&
        target &&
        createPortal(
          <div
            className="sanity-markdown-editor-portal"
            aria-label="Markdown editor (fullscreen)"
          >
            {editor}
          </div>,
          target
        )}
    </>
  )
}
