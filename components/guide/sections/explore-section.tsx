'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FilterChips } from '@/components/guide/filter-chips'
import { ActivityCard } from '@/components/guide/listing-cards'
import { SectionHeading } from '@/components/guide/section-heading'
import { type DistanceKey, distanceTabs, guidebook } from '@/lib/guidebook'

export function ExploreSection() {
  const [tab, setTab] = useState<DistanceKey>('local')
  const [category, setCategory] = useState('all')
  const { thingsToDo } = guidebook

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="Things to do"
        title="Out & about on the West Coast"
        intro="Our favourite ways to spend a day — from your doorstep to the mountains."
      />

      <div className="flex flex-col gap-3">
        <FilterChips label="Filter by category" options={thingsToDo.categories} value={category} onChange={setCategory} />

        <Tabs value={tab} onValueChange={(value) => setTab(value as DistanceKey)} className="gap-4">
          <TabsList className="grid h-auto! w-full grid-cols-3 rounded-xl p-1">
            {distanceTabs.map((t) => (
              <TabsTrigger key={t.key} value={t.key} className="h-auto! min-h-14 flex-col gap-0 rounded-lg py-2 text-sm">
                <span>{t.label}</span>
                <span className="text-[0.7rem] font-normal text-muted-foreground">{t.hint}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {distanceTabs.map((t) => {
            const items = thingsToDo[t.key].filter((item) => category === 'all' || item.categories.includes(category))
            return (
              <TabsContent key={t.key} value={t.key} className="flex flex-col gap-4">
                {items.length > 0 ? (
                  items.map((item) => <ActivityCard key={item.id} activity={item} />)
                ) : (
                  <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                    No <span className="capitalize">{category}</span> ideas in this distance yet — try another tab.
                  </p>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
