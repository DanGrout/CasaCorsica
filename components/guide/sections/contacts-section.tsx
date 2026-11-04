'use client'

import { MapPin, MessageCircle, Navigation, Phone, Share2, Siren } from 'lucide-react'
import { ActionLink } from '@/components/guide/action-link'
import { CopyButton } from '@/components/guide/copy-button'
import { SectionHeading } from '@/components/guide/section-heading'
import { Button } from '@/components/ui/button'
import { guidebook, mapsUrl, telHref } from '@/lib/guidebook'

export function ContactsSection() {
  const { contacts, property } = guidebook

  async function shareAddress() {
    const data = { title: property.name, text: property.address, url: mapsUrl(property.address) }
    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {}
    } else {
      window.open(data.url, '_blank', 'noopener')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="Emergency & contacts"
        title="Help, whenever you need it"
        intro="Tap any number to call. In a life-threatening emergency, dial 112 from any mobile."
      />

      <section aria-labelledby="emergency-title" className="flex flex-col gap-3">
        <h2 id="emergency-title" className="flex items-center gap-2 font-serif text-xl font-medium">
          <Siren className="size-5 text-destructive" aria-hidden />
          Emergency services
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {contacts.emergency.map((contact) => (
            <li key={contact.label}>
              <a
                href={telHref(contact.phone)}
                className="flex h-full min-h-28 flex-col justify-between gap-2 rounded-2xl bg-red-700 p-4 text-white transition-opacity active:opacity-80"
              >
                <Phone className="size-5" aria-hidden />
                <span className="flex flex-col">
                  <span className="whitespace-nowrap text-xl font-semibold tabular-nums">{contact.phone}</span>
                  <span className="text-sm font-medium leading-tight">{contact.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="local-title" className="flex flex-col gap-3">
        <h2 id="local-title" className="font-serif text-xl font-medium">
          Medical & local services
        </h2>
        <ul className="flex flex-col gap-3">
          {contacts.local.map((contact) => (
            <li key={contact.label} className="flex flex-col gap-3 rounded-2xl border bg-card p-4">
              <div>
                <h3 className="font-medium">{contact.label}</h3>
                {contact.description && <p className="text-sm text-muted-foreground">{contact.description}</p>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ActionLink href={telHref(contact.phone)} aria-label={`Call ${contact.label}`}>
                  <Phone aria-hidden />
                  Call
                </ActionLink>
                {contact.mapsQuery && (
                  <ActionLink href={mapsUrl(contact.mapsQuery)} external variant="outline" aria-label={`Directions to ${contact.label}`}>
                    <Navigation aria-hidden />
                    Directions
                  </ActionLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="address-title" className="flex flex-col gap-3 rounded-2xl border bg-card p-4">
        <h2 id="address-title" className="flex items-center gap-2 font-serif text-xl font-medium">
          <MapPin className="size-5 text-oak" aria-hidden />
          Property address
        </h2>
        <CopyButton label="Address" value={property.address} multiline />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={shareAddress} variant="outline" className="h-11 rounded-xl">
            <Share2 aria-hidden />
            Share
          </Button>
          <ActionLink href={mapsUrl(property.address)} external variant="outline">
            <MapPin aria-hidden />
            Open map
          </ActionLink>
        </div>
      </section>
    </div>
  )
}
