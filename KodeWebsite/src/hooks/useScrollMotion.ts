import { useEffect } from 'react'
import type { RefObject } from 'react'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Native scroll effects: CSS owns the presentation; this hook only supplies progress. */
export function useScrollMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reveals = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
    const scenes = [...root.querySelectorAll<HTMLElement>('[data-scroll-scene]')]
    const originallyRevealed = new Set(reveals.filter((element) => element.classList.contains('is-revealed')))
    const originallyInstant = new Set(reveals.filter((element) => element.classList.contains('is-reveal-instant')))
    const sceneValues = new Map<HTMLElement, string>()
    let pageValue = ''
    let frame: number | null = null
    let enabled = false
    let observer: IntersectionObserver | null = null
    let resizeObserver: ResizeObserver | null = null

    const reveal = (element: Element, instant = false) => {
      element.classList.add('is-revealed')
      if (instant) element.classList.add('is-reveal-instant')
      observer?.unobserve(element)
    }
    const showAll = () => reveals.forEach((element) => reveal(element, true))
    const restore = () => {
      root.classList.remove('motion-ready')
      root.style.removeProperty('--page-progress')
      scenes.forEach((element) => element.style.removeProperty('--scene-progress'))
      reveals.forEach((element) => {
        if (!originallyRevealed.has(element)) element.classList.remove('is-revealed')
        if (!originallyInstant.has(element)) element.classList.remove('is-reveal-instant')
      })
    }

    // Unsupported environments keep the complete, readable page without effects.
    if (typeof window.matchMedia !== 'function' || typeof IntersectionObserver === 'undefined') {
      showAll()
      return restore
    }

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      frame = null
      if (!enabled) return

      const viewport = window.innerHeight
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport)
      const nextPageValue = (maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0).toFixed(4)
      // Read geometry together before applying any style changes.
      const values = scenes.map((element) => {
        const rect = element.getBoundingClientRect()
        return { element, value: clamp((viewport - rect.top) / (viewport + rect.height)).toFixed(4) }
      })

      if (pageValue !== nextPageValue) {
        root.style.setProperty('--page-progress', nextPageValue)
        pageValue = nextPageValue
      }
      values.forEach(({ element, value }) => {
        if (sceneValues.get(element) !== value) {
          element.style.setProperty('--scene-progress', value)
          sceneValues.set(element, value)
        }
      })
    }

    const schedule = () => {
      if (enabled && frame === null) frame = window.requestAnimationFrame(update)
    }

    const revealTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element) || !root.contains(target)) return
      // Anchor destinations can wrap reveal groups or sit inside a hidden card.
      reveals.forEach((element) => {
        if (element.contains(target) || target.contains(element)) reveal(element, true)
      })
    }

    const onFocus = (event: FocusEvent) => revealTarget(event.target)
    const revealHash = () => {
      if (!window.location.hash) return
      try {
        revealTarget(document.getElementById(decodeURIComponent(window.location.hash.slice(1))))
      } catch {
        // A malformed URL fragment must not interfere with normal scrolling.
      }
    }
    const onFind = (event: KeyboardEvent) => {
      // Keep browser Find able to reach every passage without waiting for motion.
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') showAll()
    }

    const applyPreference = () => {
      enabled = false
      observer?.disconnect()
      observer = null
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      root.classList.remove('motion-ready')

      if (preference.matches) {
        showAll()
        return
      }

      try {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target)
          })
        }, { rootMargin: '0px 0px -24px 0px', threshold: 0 })

        // Never hide content already on screen, including restored scroll positions.
        const alreadyInView = reveals.filter((element) => element.getBoundingClientRect().top < window.innerHeight)
        alreadyInView.forEach((element) => reveal(element, true))
        reveals.forEach((element) => {
          if (!element.classList.contains('is-revealed')) observer?.observe(element)
        })
        revealHash()
        revealTarget(document.activeElement)
        enabled = true
        update()
        root.classList.add('motion-ready')
      } catch {
        // Never leave essential content hidden if motion setup is unavailable.
        observer?.disconnect()
        observer = null
        enabled = false
        showAll()
      }
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('hashchange', revealHash)
    window.addEventListener('keydown', onFind)
    root.addEventListener('focusin', onFocus)
    preference.addEventListener('change', applyPreference)

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(schedule)
      resizeObserver.observe(root)
    }

    applyPreference()

    return () => {
      enabled = false
      if (frame !== null) window.cancelAnimationFrame(frame)
      observer?.disconnect()
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', revealHash)
      window.removeEventListener('keydown', onFind)
      root.removeEventListener('focusin', onFocus)
      preference.removeEventListener('change', applyPreference)
      restore()
    }
  }, [rootRef])
}
