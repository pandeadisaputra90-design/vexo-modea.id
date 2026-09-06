import { Target, Eye, Heart, Award, Users2, MapPinned } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import { TRUST_STATS } from '../data/testimonials'
import { SITE } from '../config/site'

const VALUES = [
  { icon: Heart, title: 'Kejujuran', desc: 'Kondisi mobil dan harga selalu transparan, tanpa biaya tersembunyi.' },
  { icon: Award, title: 'Kualitas', desc: 'Setiap unit melalui inspeksi ketat sebelum ditawarkan ke pelanggan.' },
  { icon: Users2, title: 'Kepedulian', desc: 'Kami mendengarkan kebutuhan setiap pelanggan secara personal.' },
]

const TIMELINE = [
  { year: '2014', title: 'Awal Mula', desc: `${SITE.brand} berdiri sebagai showroom kecil di Denpasar.` },
  { year: '2017', title: 'Ekspansi Layanan', desc: 'Mulai menghadirkan layanan rental mobil dan kredit kendaraan.' },
  { year: '2020', title: 'Digitalisasi', desc: 'Meluncurkan layanan konsultasi digital via WhatsApp dan katalog online.' },
  { year: '2024', title: 'Terpercaya di Bali', desc: 'Melayani ribuan pelanggan dengan jaringan mitra leasing & asuransi luas.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title={SITE.brand}
        description={`${SITE.tagline} Hadir untuk memberikan pengalaman jual beli, sewa, dan pembiayaan mobil yang aman, transparan, dan nyaman.`}
      />

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Misi Kami</h3>
              <p className="mt-3 leading-relaxed text-white/60">
                Menyediakan solusi mobilitas yang lengkap, terpercaya, dan mudah diakses bagi seluruh masyarakat Bali —
                mulai dari jual beli mobil bekas berkualitas, rental, pembiayaan, hingga perlindungan kendaraan.
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Visi Kami</h3>
              <p className="mt-3 leading-relaxed text-white/60">
                Menjadi showroom mobil bekas paling terpercaya di Bali, dikenal karena integritas, kualitas layanan, dan
                inovasi teknologi dalam setiap pengalaman pelanggan.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-white/50 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Nilai Kami" title="Prinsip yang Kami" highlight="Junjung Tinggi" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="glow-card flex flex-col items-center gap-3 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/20 to-ember-500/20 text-electric-400 ring-1 ring-white/10">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Perjalanan Kami" title="Sejarah" highlight={SITE.brand} />
          <div className="mt-14 space-y-8 border-l border-white/10 pl-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[38px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-electric-400 bg-charcoal-950" />
                <p className="font-display text-sm font-bold text-electric-400">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="glass-card flex flex-col items-center gap-4 p-10">
            <MapPinned className="h-8 w-8 text-electric-400" />
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Kunjungi Showroom Kami di Denpasar</h2>
            <p className="max-w-xl text-white/60">
              Datang langsung untuk melihat koleksi mobil kami atau berkonsultasi dengan tim profesional kami.
            </p>
            <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin berkunjung ke showroom.`} label="Konsultasi via WhatsApp" />
          </div>
        </div>
      </section>
    </>
  )
}
