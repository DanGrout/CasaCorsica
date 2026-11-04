'use client'

import { useEffect } from 'react'

export function ThemeSync() {
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    function sync() {
      let theme = 'system'
      try {
        theme = JSON.parse(localStorage.getItem('cc-prefs') || '{}').theme || 'system'
      } catch {}
      if (theme === 'system') document.documentElement.classList.toggle('dark', media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  return null
}
