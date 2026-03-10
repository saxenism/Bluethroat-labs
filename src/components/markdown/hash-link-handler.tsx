'use client'

import { useEffect } from 'react'

/**
 * Client-side handler for hash links when using rehype-sanitize.
 *
 * rehype-sanitize prefixes `id` and `name` with "user-content-" to prevent
 * DOM clobbering, but does not change `href`. So links stay as "#fn-1" while
 * targets become id="user-content-fn-1", and the browser won't scroll.
 *
 * This component implements the approach from the rehype-sanitize readme
 * (Example: headings (DOM clobbering)): on hashchange and when clicking
 * a same-page hash link, resolve the target using the prefixed id and scroll.
 *
 * @see https://github.com/remarkjs/remark-gfm/issues/28
 */
export function HashLinkHandler() {
  useEffect(() => {
    function scrollToPrefixedTarget() {
      let hash: string
      try {
        hash = decodeURIComponent(location.hash.slice(1))
      } catch {
        return
      }
      if (!hash) return
      const prefixedId = 'user-content-' + hash
      const target =
        document.getElementById(prefixedId) ||
        document.getElementsByName(prefixedId)[0]
      if (target) {
        const offset = 128
        requestAnimationFrame(() => {
          const top =
            window.scrollY +
            (target as HTMLElement).getBoundingClientRect().top -
            offset
          window.scrollTo({ top, behavior: 'smooth' })
        })
      }
    }

    scrollToPrefixedTarget()

    window.addEventListener('hashchange', scrollToPrefixedTarget)

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (
        target instanceof HTMLAnchorElement &&
        target.href === location.href &&
        location.hash.length > 1
      ) {
        requestAnimationFrame(() => {
          if (!event.defaultPrevented) scrollToPrefixedTarget()
        })
      }
    }
    document.addEventListener('click', handleClick, false)

    return () => {
      window.removeEventListener('hashchange', scrollToPrefixedTarget)
      document.removeEventListener('click', handleClick, false)
    }
  }, [])

  return null
}
