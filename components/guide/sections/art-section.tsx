'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormspreeForm } from '@/components/guide/formspree-form'
import { SectionHeading } from '@/components/guide/section-heading'
import { type ArtPiece, guidebook } from '@/lib/guidebook'
import { cn } from '@/lib/utils'

export function ArtSection() {
  const [selected, setSelected] = useState<ArtPiece | null>(null)
  const { art } = guidebook

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading eyebrow="The collection" title={`Art by ${art.artist}`} intro={art.intro} />

      <ul className="flex flex-col gap-4">
        {art.pieces.map((piece) => (
          <li key={piece.id}>
            <article className="overflow-hidden rounded-2xl border bg-card">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={piece.image || '/placeholder.svg'}
                  alt={`${piece.title} by ${art.artist}`}
                  fill
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
                <span
                  className={cn(
                    'absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold',
                    piece.available ? 'bg-background/90 text-foreground backdrop-blur' : 'bg-primary text-primary-foreground',
                  )}
                >
                  {piece.available ? 'Available' : 'Private collection'}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <div>
                  <h2 className="font-serif text-xl font-medium">{piece.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {piece.medium} · {piece.size}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden />
                    Find it: {piece.location.toLowerCase()}
                  </p>
                </div>
                <Button onClick={() => setSelected(piece)} className="h-11 rounded-xl" variant={piece.available ? 'default' : 'outline'}>
                  {piece.available ? 'Enquire about this piece' : 'Ask about similar work'}
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-2xl p-5 sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-medium">{selected.title}</DialogTitle>
                <DialogDescription>
                  {`Send an enquiry to ${art.artist}. Leave your email so they can reply with pricing and availability.`}
                </DialogDescription>
              </DialogHeader>
              <FormspreeForm
                key={selected.id}
                endpoint="https://formspree.io/f/xwlopqlp"
                subject={`Art enquiry: ${selected.title} by ${art.artist}`}
                nameRequired
                phoneRequired
                emailRequired
                extraFields={{ artwork: `${selected.title} (${selected.medium}, ${selected.size})` }}
                defaultMessage={`Hi, I'm staying at ${guidebook.property.name} and I'd love to know more about "${selected.title}".`}
                submitLabel="Send enquiry"
                successTitle="Enquiry sent"
                successMessage={`Thank you! ${art.artist} will be in touch by email soon.`}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
