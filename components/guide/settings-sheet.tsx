'use client'

import { useState } from 'react'
import { Contrast, Monitor, Moon, Smartphone, Sun } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'
type TextSize = 'md' | 'lg' | 'xl'
type Prefs = { theme: Theme; contrast: boolean; text: TextSize }

const STORAGE_KEY = 'cc-prefs'

function readPrefs(): Prefs {
  try {
    return { theme: 'system', contrast: false, text: 'md', ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  } catch {
    return { theme: 'system', contrast: false, text: 'md' }
  }
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement
  const dark = prefs.theme === 'dark' || (prefs.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  root.classList.toggle('dark', dark)
  root.classList.toggle('hc', prefs.contrast)
  if (prefs.text === 'md') delete root.dataset.text
  else root.dataset.text = prefs.text
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

export function SettingsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <SheetHeader className="px-5 pt-6">
          <SheetTitle className="font-serif text-2xl font-medium">Display</SheetTitle>
          <SheetDescription>Make the guide comfortable to read.</SheetDescription>
        </SheetHeader>
        <SettingsControls />
      </SheetContent>
    </Sheet>
  )
}

function SettingsControls() {
  const [prefs, setPrefs] = useState<Prefs>(readPrefs)

  function update(next: Partial<Prefs>) {
    const merged = { ...prefs, ...next }
    setPrefs(merged)
    applyPrefs(merged)
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-5">
      <Segmented
        label="Appearance"
        value={prefs.theme}
        onChange={(theme) => update({ theme })}
        options={[
          { value: 'light', label: 'Light', icon: <Sun aria-hidden className="size-4" /> },
          { value: 'dark', label: 'Dark', icon: <Moon aria-hidden className="size-4" /> },
          { value: 'system', label: 'Auto', icon: <Monitor aria-hidden className="size-4" /> },
        ]}
      />
      <Segmented
        label="Text size"
        value={prefs.text}
        onChange={(text) => update({ text })}
        options={[
          { value: 'md', label: <span className="text-sm">Aa</span>, ariaLabel: 'Standard text' },
          { value: 'lg', label: <span className="text-base">Aa</span>, ariaLabel: 'Large text' },
          { value: 'xl', label: <span className="text-lg">Aa</span>, ariaLabel: 'Extra large text' },
        ]}
      />
      <button
        type="button"
        role="switch"
        aria-checked={prefs.contrast}
        onClick={() => update({ contrast: !prefs.contrast })}
        className="flex min-h-14 items-center justify-between gap-3 rounded-xl border bg-card px-4 text-left"
      >
        <span className="flex items-center gap-3">
          <Contrast className="size-5 text-oak" aria-hidden />
          <span className="font-medium">High contrast</span>
        </span>
        <span className={cn('relative h-7 w-12 rounded-full transition-colors', prefs.contrast ? 'bg-primary' : 'bg-muted-foreground/30')}>
          <span
            className={cn(
              'absolute top-1 size-5 rounded-full bg-background shadow transition-transform',
              prefs.contrast ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </span>
      </button>
      <p className="flex gap-3 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
        <Smartphone className="mt-0.5 size-5 shrink-0 text-oak" aria-hidden />
        <span>
          <strong className="font-semibold">Save to your home screen:</strong> tap Share then {'"Add to Home Screen"'} on iPhone,
          or the menu then {'"Install app"'} on Android. It works offline too.
        </span>
      </p>
    </div>
  )
}

type Option<T> = { value: T; label: React.ReactNode; icon?: React.ReactNode; ariaLabel?: string }

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={option.ariaLabel}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors',
                active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {option.icon}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
