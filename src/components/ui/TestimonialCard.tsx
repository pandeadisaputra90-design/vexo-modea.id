import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '../../data/types'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass-card flex h-full flex-col gap-4 p-6">
      <Quote className="h-8 w-8 text-electric-500/40" />
      <p className="flex-1 text-sm leading-relaxed text-white/75">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-ember-400 text-ember-400' : 'text-white/15'}`}
          />
        ))}
      </div>
      <div className="border-t border-white/10 pt-4">
        <p className="font-display font-semibold text-white">{testimonial.name}</p>
        <p className="text-xs text-white/50">
          {testimonial.role} &middot; {testimonial.location}
        </p>
        {testimonial.vehicle && <p className="mt-1 text-xs text-electric-400">{testimonial.vehicle}</p>}
      </div>
    </div>
  )
}
