import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'
import WhatsAppButton from '../ui/WhatsAppButton'
import DiagnosticHero from './DiagnosticHero'
import { TRUST_STATS } from '../../data/testimonials'
import { SITE } from '../../config/site'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 pb-20 pt-28 sm:pt-40">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-ember-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Trusted Car Solution di Denpasar, Bali
          </span>
          <h1
            className="mt-4 animate-fade-up font-display text-3xl font-black leading-[1.1] text-white sm:mt-6 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Temukan Mobil <span className="text-gradient-blue">Impianmu</span>
            <br className="hidden sm:block" /> di <span className="text-gradient-orange">Bali</span>
          </h1>
        </div>

        {/* Diagnostic panel comes right after the headline so price/km/year/transmisi/pajak
            are legible on the first screen on mobile, ahead of the marketing copy below. */}
        <div className="mt-8 sm:mt-12">
          <DiagnosticHero />
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p
            className="mx-auto animate-fade-up text-base text-white/60 sm:text-lg"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Jual beli mobil bekas berkualitas, rental terpercaya, kredit &amp; asuransi, hingga inspeksi
            profesional — semua solusi mobilitas Anda dalam satu tempat terpercaya di Denpasar.
          </p>
          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <Link to="/katalog" className="btn-primary">
              Lihat Koleksi Mobil
            </Link>
            <WhatsAppButton
              variant="outline"
              message={`Halo ${SITE.brand}, saya ingin konsultasi mengenai mobil bekas berkualitas.`}
              label="Konsultasi via WhatsApp"
            />
          </div>

          <div
            className="mt-6 flex animate-fade-up items-center justify-center gap-2 text-xs text-white/40"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <ShieldCheck className="h-4 w-4 text-electric-400" />
            Terinspeksi &middot; Bergaransi &middot; Legalitas Aman
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
