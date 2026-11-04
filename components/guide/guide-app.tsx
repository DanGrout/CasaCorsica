'use client'

import { useState } from 'react'
import { ArrowLeft, Compass, House, Phone, Search, SlidersHorizontal, Sun, Utensils, type LucideIcon } from 'lucide-react'
import { type Section, useSection } from '@/hooks/use-section'
import { guidebook } from '@/lib/guidebook'
import { cn } from '@/lib/utils'
import { SearchDialog } from '@/components/guide/search-dialog'
import { SettingsSheet } from '@/components/guide/settings-sheet'
import { WelcomeSection } from '@/components/guide/sections/welcome-section'
import { ExploreSection } from '@/components/guide/sections/explore-section'
import { EatSection } from '@/components/guide/sections/eat-section'
import { HouseSection } from '@/components/guide/sections/house-section'
import { ContactsSection } from '@/components/guide/sections/contacts-section'
import { SuggestSection } from '@/components/guide/sections/suggest-section'
import { ArtSection } from '@/components/guide/sections/art-section'

const tabs: { section: Section; label: string; icon: LucideIcon }[] = [
  { section: 'home', label: 'Welcome', icon: Sun },
  { section: 'explore', label: 'Explore', icon: Compass },
  { section: 'eat', label: 'Eat', icon: Utensils },
  { section: 'house', label: 'House', icon: House },
  { section: 'contacts', label: 'SOS', icon: Phone },
]

export function GuideApp() {
  const { section, navigate } = useSection()
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isHome = section === 'home'

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-xl items-center gap-2 px-2">
          {isHome ? (
            <span className="px-2 font-serif text-lg font-medium">{guidebook.property.name}</span>
          ) : (
            <button
              type="button"
              onClick={() => navigate('home')}
              className="flex h-11 items-center gap-1.5 rounded-xl px-2 text-sm font-medium hover:bg-muted"
            >
              <ArrowLeft className="size-5" aria-hidden />
              <span className="font-serif text-lg">{guidebook.property.name}</span>
            </button>
          )}
          <div className="ml-auto flex items-center gap-1">
            <IconButton label="Search all listings" onClick={() => setSearchOpen(true)} icon={Search} />
            <IconButton label="Display settings" onClick={() => setSettingsOpen(true)} icon={SlidersHorizontal} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4">
        {section === 'home' && <WelcomeSection onNavigate={navigate} />}
        {section === 'explore' && <ExploreSection />}
        {section === 'eat' && <EatSection />}
        {section === 'house' && <HouseSection />}
        {section === 'contacts' && <ContactsSection />}
        {section === 'suggest' && <SuggestSection />}
        {section === 'art' && <ArtSection />}
      </main>

      <nav
        aria-label="Guide sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        <ul className="mx-auto grid max-w-xl grid-cols-5">
          {tabs.map(({ section: target, label, icon: Icon }) => {
            const active = section === target
            return (
              <li key={target}>
                <button
                  type="button"
                  onClick={() => navigate(target)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex h-16 w-full flex-col items-center justify-center gap-1 text-[0.7rem] font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    target === 'contacts' && !active && 'text-destructive',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-14 items-center justify-center rounded-full',
                      active && (target === 'contacts' ? 'bg-red-700 text-white' : 'bg-primary text-primary-foreground'),
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}

function IconButton({ label, onClick, icon: Icon }: { label: string; onClick: () => void; icon: LucideIcon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted"
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}
