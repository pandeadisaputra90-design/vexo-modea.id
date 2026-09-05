interface Props {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({ eyebrow, title, highlight, description, align = 'center', light }: Props) {
  return (
    <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${light ? 'text-white' : ''}`}>
        {title} {highlight && <span className="text-gradient-blue">{highlight}</span>}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base text-white/60 sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
