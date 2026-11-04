'use client'

import { cn } from '@/lib/utils'

type FilterChipsProps = {
  options: string[]
  value: string
  onChange: (value: string) => void
  label: string
}

export function FilterChips({ options, value, onChange, label }: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      {['all', ...options].map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              'h-10 shrink-0 rounded-full border px-4 text-sm font-medium capitalize transition-colors',
              active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
