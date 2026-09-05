import { useState } from 'react'
import { FileCheck2, CreditCard, Clock3, ShieldCheck } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import RentalCard from '../components/ui/RentalCard'
import { RENTALS } from '../data/rentals'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import { SITE } from '../config/site'

const REQUIREMENTS = [
  { icon: FileCheck2, title: 'KTP / Paspor Asli', desc: 'KTP untuk WNI atau Paspor & KITAS untuk wisatawan asing.' },
  { icon: CreditCard, title: 'Deposit Jaminan', desc: 'Deposit dikembalikan penuh setelah unit dikembalikan sesuai kondisi.' },
  { icon: Clock3, title: 'SIM Aktif', desc: 'SIM A yang masih berlaku untuk unit lepas kunci (self-drive).' },
  { icon: ShieldCheck, title: 'Sudah Diasuransikan', desc: 'Seluruh armada rental sudah dilindungi asuransi all-risk.' },
]

export default function Rental() {
  const [mode, setMode] = useState<'harian' | 'bulanan'>('harian')

  return (
    <>
      <PageHero
        eyebrow="Rental Mobil Terpercaya"
        title="Sewa Mobil Sekarang, Nyaman & Fleksibel"
        description="Armada terawat untuk kebutuhan wisata, bisnis, hingga acara khusus di seluruh Bali — tersedia paket harian dan bulanan."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin sewa mobil. Mohon info pilihan unit dan harganya.`} />
          <a href="#armada" className="btn-outline">
            Lihat Pilihan Armada
          </a>
        </div>
      </PageHero>

      <section id="armada" className="relative bg-charcoal-950 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pilihan Armada"
            title="Sewa Mobil"
            highlight="Harian & Bulanan"
            description="Semua unit rutin diservis dan dibersihkan sebelum diserahkan ke pelanggan."
          />

          <div className="mt-8 flex justify-center">
            <div className="glass-card inline-flex rounded-full p-1">
              <button
                type="button"
                onClick={() => setMode('harian')}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  mode === 'harian' ? 'bg-electric-500 text-charcoal-950' : 'text-white/60'
                }`}
              >
                Sewa Harian
              </button>
              <button
                type="button"
                onClick={() => setMode('bulanan')}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  mode === 'bulanan' ? 'bg-electric-500 text-charcoal-950' : 'text-white/60'
                }`}
              >
                Sewa Bulanan
              </button>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/45">
            {mode === 'harian'
              ? 'Cocok untuk liburan singkat, urusan bisnis, atau kebutuhan mendadak. Tersedia opsi lepas kunci maupun dengan supir.'
              : 'Paket hemat untuk kebutuhan jangka panjang — ideal untuk ekspatriat, digital nomad, atau operasional perusahaan.'}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RENTALS.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Syarat & Ketentuan"
            title="Dokumen yang"
            highlight="Perlu Disiapkan"
            description="Proses cepat, cukup siapkan dokumen berikut sebelum unit diantar."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REQUIREMENTS.map((req) => (
              <div key={req.title} className="glass-card flex flex-col gap-3 p-6 text-center items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                  <req.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-white">{req.title}</h3>
                <p className="text-xs leading-relaxed text-white/50">{req.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin tanya syarat sewa mobil.`} label="Konsultasi via WhatsApp" />
          </div>
        </div>
      </section>
    </>
  )
}
