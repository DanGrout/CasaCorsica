import { FormspreeForm } from '@/components/guide/formspree-form'
import { SectionHeading } from '@/components/guide/section-heading'
import { guidebook } from '@/lib/guidebook'

export function SuggestSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading eyebrow="Suggestion box" title="We'd love your thoughts" intro={guidebook.suggestions.intro} />
      <FormspreeForm
        subject={`Guest suggestion — ${guidebook.property.name}`}
        messagePlaceholder="A tip for future guests, something we could improve, or just say hi…"
        submitLabel="Send suggestion"
        successTitle="Thank you!"
        successMessage="Your note is on its way to us. Thank you for helping make Casa Corsica even better."
      />
    </div>
  )
}
