import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'
import { TESTIMONIALS } from '../../data/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="relative bg-charcoal-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni Pelanggan"
          title="Dipercaya Ratusan"
          highlight="Pelanggan di Bali"
          description="Kepuasan dan kepercayaan pelanggan adalah prioritas utama kami."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
