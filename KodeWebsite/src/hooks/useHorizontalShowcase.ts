import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEventHandler, RefObject } from 'react'

const HEADER_HEIGHT = 86
const clamp = (value: number, maximum: number) => Math.min(maximum, Math.max(0, value))

export function useHorizontalShowcase(
  sectionRef: RefObject<HTMLElement | null>,
  viewportRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLOListElement | null>,
  count: number,
) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeRef = useRef(0)
  const navigateRef = useRef<((index: number) => void) | null>(null)

  const goTo = useCallback((index: number) => navigateRef.current?.(index), [])
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
    // Links and any other controls inside a slide keep their own keyboard behavior.
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return
    const destinations: Record<string, number> = {
      ArrowLeft: activeRef.current - 1,
      ArrowRight: activeRef.current + 1,
      Home: 0,
      End: count - 1,
    }
    if (!(event.key in destinations)) return
    event.preventDefault()
    goTo(destinations[event.key])
  }, [count, goTo])

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    const slides = [...track.children].filter((element): element is HTMLElement => element instanceof HTMLElement).slice(0, count)
    const desktop = window.matchMedia('(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let pinned = false
    let travel = 0
    let offsets: number[] = []
    let frame: number | null = null
    let needsMeasure = true
    let needsPageSync = true
    let disposed = false
    let hasMeasured = false
    let measuredWidth = window.innerWidth
    let measuredHeight = window.innerHeight
    let sceneSnapshot: { visible: boolean, inPinnedScene: boolean, left: number, index: number } | null = null

    const updateActive = () => {
      const left = clamp(viewport.scrollLeft, travel)
      let next = 0
      let distance = Infinity
      offsets.forEach((offset, index) => {
        const delta = Math.abs(left - offset)
        if (delta < distance) {
          distance = delta
          next = index
        }
      })
      // The last card may have a shorter final step than all preceding cards.
      if (travel > 0 && left >= travel - 1) next = Math.max(0, slides.length - 1)
      if (next !== activeRef.current) {
        activeRef.current = next
        setActiveIndex(next)
      }
      const rect = section.getBoundingClientRect()
      sceneSnapshot = {
        visible: rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT,
        inPinnedScene: pinned && rect.top <= HEADER_HEIGHT + 1 && rect.bottom >= window.innerHeight - 1,
        left,
        index: next,
      }
    }

    const documentTop = () => window.scrollY + section.getBoundingClientRect().top

    const syncFromPage = () => {
      if (!pinned) return
      const left = clamp(HEADER_HEIGHT - section.getBoundingClientRect().top, travel)
      if (Math.abs(viewport.scrollLeft - left) > .5) {
        // An explicit instant write also bypasses any CSS scroll-behavior rule.
        viewport.scrollTo({ left, behavior: 'instant' })
      }
    }

    const measure = () => {
      const previousPinned = pinned
      const previousTravel = travel
      const nextPinned = desktop.matches && slides.length > 1
      const changedLayout = hasMeasured && (measuredWidth !== window.innerWidth || measuredHeight !== window.innerHeight || pinned !== nextPinned)
      // Reflow and browser scroll anchoring can happen before the resize event.
      // Use the last stable view, not geometry already changed by the new layout.
      const previousView = changedLayout ? sceneSnapshot : null
      const previousLeft = previousView?.left ?? viewport.scrollLeft
      const previousIndex = previousView?.index ?? activeRef.current
      const before = section.getBoundingClientRect()
      const wasInPinnedScene = previousView?.inPinnedScene ?? (previousPinned && before.top <= HEADER_HEIGHT + 1 && before.bottom >= window.innerHeight - 1)
      const wasNativeSceneVisible = hasMeasured && !previousPinned && (previousView?.visible ?? (before.top < window.innerHeight && before.bottom > HEADER_HEIGHT))
      const wasAtEnd = previousTravel > 0 && previousLeft >= previousTravel - 1

      pinned = nextPinned
      section.classList.toggle('is-pinned', pinned)
      if (!pinned) section.style.removeProperty('--work-travel')

      travel = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      const firstLeft = slides[0]?.getBoundingClientRect().left ?? 0
      offsets = slides.map((slide) => clamp(slide.getBoundingClientRect().left - firstLeft, travel))

      if (pinned) {
        const value = `${travel}px`
        if (section.style.getPropertyValue('--work-travel') !== value) {
          section.style.setProperty('--work-travel', value)
        }
      }

      if (wasInPinnedScene && !pinned) {
        // Collapsing the tall section must not strand the user beyond its cards.
        window.scrollTo({ top: documentTop() - HEADER_HEIGHT, behavior: 'instant' })
        viewport.scrollTo({ left: offsets[previousIndex] ?? 0, behavior: 'instant' })
      } else if (wasInPinnedScene && pinned && previousTravel > 0 && travel !== previousTravel) {
        // Keep the same relative place when the desktop viewport changes width.
        // The browser may already have clamped scrollLeft to a new, shorter range.
        const left = wasAtEnd ? travel : clamp(previousLeft / previousTravel * travel, travel)
        window.scrollTo({ top: documentTop() - HEADER_HEIGHT + left, behavior: 'instant' })
      } else if (wasNativeSceneVisible && pinned) {
        // Re-enabling motion should keep the card the user selected in native mode.
        // hasMeasured prevents this branch from moving the page on initial mount.
        const left = offsets[previousIndex] ?? 0
        window.scrollTo({ top: documentTop() - HEADER_HEIGHT + left, behavior: 'instant' })
      }
      hasMeasured = true
      measuredWidth = window.innerWidth
      measuredHeight = window.innerHeight
    }

    const update = () => {
      frame = null
      if (disposed) return
      if (measuredWidth !== window.innerWidth || measuredHeight !== window.innerHeight || pinned !== (desktop.matches && slides.length > 1)) {
        needsMeasure = true
      }
      if (needsMeasure) {
        needsMeasure = false
        measure()
        needsPageSync = true
      }
      if (needsPageSync) {
        needsPageSync = false
        syncFromPage()
      }
      updateActive()
    }

    const schedule = () => {
      if (!disposed && frame === null) frame = window.requestAnimationFrame(update)
    }

    const onWindowScroll = () => {
      needsPageSync = true
      schedule()
    }
    const onViewportScroll = () => schedule()
    const onResize = () => {
      needsMeasure = true
      schedule()
    }

    const navigate = (requestedIndex: number, behavior: ScrollBehavior) => {
      if (!slides.length || !Number.isFinite(requestedIndex)) return
      if (needsMeasure) {
        needsMeasure = false
        measure()
      }
      const index = clamp(Math.round(requestedIndex), slides.length - 1)
      const left = offsets[index] ?? 0
      if (pinned) {
        window.scrollTo({ top: documentTop() - HEADER_HEIGHT + left, behavior })
      } else {
        viewport.scrollTo({ left, behavior })
      }
      schedule()
    }

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement) || event.target === viewport) return
      const target = event.target
      const index = slides.findIndex((slide) => slide.contains(target))
      if (index < 0) return

      if (pinned) {
        // Native Tab can scroll the horizontal viewport before focusin fires.
        // Move the page to the matching card so its next scroll cannot undo that.
        navigate(index, 'instant')
        syncFromPage()
        updateActive()
      } else {
        const targetRect = target.getBoundingClientRect()
        const viewportRect = viewport.getBoundingClientRect()
        if (targetRect.left < viewportRect.left || targetRect.right > viewportRect.right) {
          navigate(index, 'instant')
        }
      }
    }

    navigateRef.current = (index) => navigate(index, reduced.matches ? 'auto' : 'smooth')
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    viewport.addEventListener('scroll', onViewportScroll, { passive: true })
    viewport.addEventListener('focusin', onFocus)
    desktop.addEventListener('change', onResize)
    reduced.addEventListener('change', onResize)

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    resizeObserver?.observe(section)
    resizeObserver?.observe(viewport)
    resizeObserver?.observe(track)
    slides.forEach((slide) => resizeObserver?.observe(slide))
    update()

    return () => {
      disposed = true
      navigateRef.current = null
      if (frame !== null) window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', onWindowScroll)
      window.removeEventListener('resize', onResize)
      viewport.removeEventListener('scroll', onViewportScroll)
      viewport.removeEventListener('focusin', onFocus)
      desktop.removeEventListener('change', onResize)
      reduced.removeEventListener('change', onResize)
      section.classList.remove('is-pinned')
      section.style.removeProperty('--work-travel')
    }
  }, [sectionRef, viewportRef, trackRef, count])

  return { activeIndex, goTo, onKeyDown }
}
