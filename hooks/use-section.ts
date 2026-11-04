'use client'

import { useCallback, useSyncExternalStore } from 'react'

export const sections = ['home', 'explore', 'eat', 'house', 'contacts', 'suggest', 'art'] as const
export type Section = (typeof sections)[number]

function readSection(): Section {
  const hash = window.location.hash.replace('#', '') as Section
  return sections.includes(hash) ? hash : 'home'
}

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

export function useSection() {
  const section = useSyncExternalStore(subscribe, readSection, () => 'home' as Section)

  const navigate = useCallback((next: Section) => {
    if (next === readSection()) {
      window.scrollTo({ top: 0 })
      return
    }
    window.location.hash = next === 'home' ? '' : next
    if (next === 'home') history.replaceState(null, '', window.location.pathname)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    window.scrollTo({ top: 0 })
  }, [])

  return { section, navigate }
}
