'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import type { StringInputProps } from 'sanity'
import { set, unset } from 'sanity'
import MDEditor, {
  type MDEditorProps,
  type RefMDEditor,
} from '@uiw/react-md-editor'

const EDITOR_PROPS: Partial<MDEditorProps> = {
  height: 320,
  preview: 'edit' as const,
  visibleDragbar: false,
  enableScroll: true,
  textareaProps: {
    placeholder: 'Write in Markdown…',
    'aria-label': 'Markdown content',
  },
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

  // Sync from editor's fullscreen state (e.g. user clicked toolbar fullscreen) into our state so we can portal
  useEffect(() => {
    const interval = setInterval(() => {
      const fullscreen = editorRef.current?.fullscreen ?? false
      if (fullscreen && !isFullscreenRef.current) {
        setIsFullscreen(true)
      }
      if (!fullscreen && isFullscreenRef.current) {
        setIsFullscreen(false)
      }
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

  // Regular editor: always visible; when fullscreen overlay is open, force non-fullscreen so both show
  const editor = (
    <MDEditor
      ref={editorRef}
      value={value}
      onChange={handleChange}
      {...EDITOR_PROPS}
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
