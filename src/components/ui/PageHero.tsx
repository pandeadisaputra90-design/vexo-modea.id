import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 pb-16 pt-32 sm:pt-40">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-electric-500/10 blur-[100px]" />
      <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-ember-500/10 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">{title}</h1>
        {description && <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  )
}
