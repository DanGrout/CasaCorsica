'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FilterChips } from '@/components/guide/filter-chips'
import { ActivityCard, VenueCard } from '@/components/guide/listing-cards'
import { type Activity, type Venue, distanceTabs, guidebook } from '@/lib/guidebook'

type IndexedActivity = Activity & { distance: string }
type IndexedVenue = Venue & { type: string }

const activities: IndexedActivity[] = distanceTabs.flatMap((tab) =>
  guidebook.thingsToDo[tab.key].map((item) => ({ ...item, distance: tab.label })),
)
const venues: IndexedVenue[] = guidebook.eatDrink.groups.flatMap((group) =>
  group.items.map((item) => ({ ...item, type: group.type })),
)
const filterOptions = [...guidebook.thingsToDo.categories, ...guidebook.eatDrink.groups.map((g) => g.type)]

function matches(text: string[], query: string) {
  return text.join(' ').toLowerCase().includes(query)
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    const activityResults = activities.filter(
      (a) =>
        (filter === 'all' || a.categories.includes(filter)) &&
        (!q || matches([a.name, a.description, a.distance, a.time, ...a.categories], q)),
    )
    const venueResults = venues.filter(
      (v) =>
        (filter === 'all' || v.type === filter) && (!q || matches([v.name, v.description, v.area, v.type], q)),
    )
    const guideResults =
      filter === 'all' && q ? guidebook.houseGuide.filter((g) => matches([g.title, g.body], q)) : []
    return { activityResults, venueResults, guideResults }
  }, [q, filter])

  const total = results.activityResults.length + results.venueResults.length + results.guideResults.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-0 flex h-svh max-h-svh w-full max-w-none translate-y-0 flex-col gap-0 rounded-none p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Search the guidebook</DialogTitle>
        <div className="flex flex-col gap-3 border-b bg-background px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beaches, seafood, Wi-Fi…"
                aria-label="Search all listings"
                className="h-12 rounded-xl bg-card pl-11 text-base"
              />
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-12 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
          <FilterChips label="Filter all listings" options={filterOptions} value={filter} onChange={setFilter} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mx-auto flex max-w-xl flex-col gap-6 pb-8">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {total} {total === 1 ? 'result' : 'results'}
            </p>

            {results.activityResults.length > 0 && (
              <ResultGroup title="Things to do">
                {results.activityResults.map((a) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
              </ResultGroup>
            )}
            {results.venueResults.length > 0 && (
              <ResultGroup title="Eat & drink">
                {results.venueResults.map((v) => (
                  <VenueCard key={v.id} venue={v} />
                ))}
              </ResultGroup>
            )}
            {results.guideResults.length > 0 && (
              <ResultGroup title="House guide">
                {results.guideResults.map((g) => (
                  <div key={g.id} className="rounded-2xl border bg-card p-4">
                    <h3 className="font-medium">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
                  </div>
                ))}
              </ResultGroup>
            )}
            {total === 0 && (
              <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                {'Nothing found. Try "beach", "coffee" or "wifi".'}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-oak">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}
