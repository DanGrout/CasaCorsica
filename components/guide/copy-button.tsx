'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

type CopyButtonProps = {
  value: string
  label: string
  display?: string
  className?: string
  multiline?: boolean
}

export function CopyButton({ value, label, display, className, multiline }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const input = document.createElement('textarea')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 text-left transition-colors hover:bg-muted active:scale-[0.99]',
        className,
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={cn('text-base font-medium', multiline ? 'text-pretty' : 'truncate font-mono')}>{display ?? value}</span>
      </span>
      <span
        className={cn(
          'flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium',
          copied ? 'bg-oak text-oak-foreground' : 'bg-muted text-muted-foreground',
        )}
      >
        {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? 'Copied' : 'Copy'}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </button>
  )
}
