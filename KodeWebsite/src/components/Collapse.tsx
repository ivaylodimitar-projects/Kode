import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import './Collapse.css'

type CollapseProps = {
  open: boolean
  id: string
  labelledBy: string
  children: ReactNode
}

export function Collapse({ open, id, labelledBy, children }: CollapseProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open && panelRef.current?.contains(document.activeElement)) {
      document.getElementById(labelledBy)?.focus({ preventScroll: true })
    }
  }, [open, labelledBy])

  return (
    <div
      ref={panelRef}
      id={id}
      className={`collapse${open ? ' is-open' : ''}`}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="collapse-content">{children}</div>
    </div>
  )
}
