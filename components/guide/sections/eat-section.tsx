'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { FilterChips } from '@/components/guide/filter-chips'
import { VenueCard } from '@/components/guide/listing-cards'
import { SectionHeading } from '@/components/guide/section-heading'
import { guidebook } from '@/lib/guidebook'
import { cn } from '@/lib/utils'

export function EatSection() {
  const [type, setType] = useState('all')
  const [picksOnly, setPicksOnly] = useState(false)
  const { groups } = guidebook.eatDrink

  const visibleGroups = groups
    .filter((group) => type === 'all' || group.type === type)
    .map((group) => ({ ...group, items: group.items.filter((item) => !picksOnly || item.hostPick) }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="Eat & drink"
        title="Where we love to eat"
        intro="Fresh-off-the-boat seafood, slow coffee and the best sundowner spots. Price levels from R (budget) to RRRR (special occasion)."
      />

      <div className="flex flex-col gap-3">
        <FilterChips label="Filter by type" options={groups.map((g) => g.type)} value={type} onChange={setType} />
        <button
          type="button"
          aria-pressed={picksOnly}
          onClick={() => setPicksOnly((v) => !v)}
          className={cn(
            'flex h-10 w-fit items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
            picksOnly ? 'border-oak bg-oak text-oak-foreground' : 'bg-card hover:bg-muted',
          )}
        >
          <Star className={cn('size-4', picksOnly && 'fill-current')} aria-hidden />
          {"Host's picks only"}
        </button>
      </div>

      {visibleGroups.length === 0 && (
        <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Nothing matches those filters yet.
        </p>
      )}

      {visibleGroups.map((group) => (
        <section key={group.type} className="flex flex-col gap-3" aria-labelledby={`group-${group.type}`}>
          <h2 id={`group-${group.type}`} className="font-serif text-2xl font-medium">
            {group.type}
          </h2>
          <div className="flex flex-col gap-3">
            {group.items.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
