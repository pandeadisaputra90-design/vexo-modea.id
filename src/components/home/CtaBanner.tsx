import { Link } from 'react-router-dom'
import { CalendarCheck, Landmark } from 'lucide-react'
import WhatsAppButton from '../ui/WhatsAppButton'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric-500/20 to-ember-500/20 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Siap Menemukan Mobil <span className="text-gradient-blue">Terbaikmu?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Tim kami siap membantu proses pembelian, kredit, sewa, hingga inspeksi mobil impianmu di Bali.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton label="Konsultasi via WhatsApp" />
          <Link to="/inspeksi" className="btn-outline">
            <CalendarCheck className="h-4 w-4" /> Jadwalkan Inspeksi
          </Link>
          <Link to="/kredit-asuransi" className="btn-secondary">
            <Landmark className="h-4 w-4" /> Ajukan Kredit
          </Link>
        </div>
      </div>
    </section>
  )
}
