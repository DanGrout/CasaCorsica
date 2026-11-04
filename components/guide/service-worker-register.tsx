'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => {})
  }, [])
  return null
}
