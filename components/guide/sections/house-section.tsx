import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/guide/section-heading'
import { guidebook } from '@/lib/guidebook'

export function HouseSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="House guide & FAQs"
        title="How the house works"
        intro="Tap a topic to open it. Can't find what you need? Message us any time."
      />
      <Accordion className="overflow-hidden rounded-2xl border bg-card">
        {guidebook.houseGuide.map((entry) => (
          <AccordionItem key={entry.id} value={entry.id} className="px-4">
            <AccordionTrigger className="min-h-14 items-center py-4 text-base font-medium hover:no-underline">
              {entry.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>{entry.body}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
