import { Link } from 'react-router-dom'
import { Car, Key, Landmark, ShieldCheck, SearchCheck, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { SITE } from '../../config/site'

const SERVICES = [
  {
    icon: Car,
    title: 'Jual Beli Mobil Bekas',
    desc: 'Ratusan unit berkualitas telah melalui seleksi ketat dan siap dimiliki dengan harga transparan.',
    to: '/katalog',
    cta: 'Lihat Koleksi Mobil',
  },
  {
    icon: Key,
    title: 'Rental Mobil Terpercaya',
    desc: 'Sewa harian maupun bulanan dengan armada terawat, cocok untuk wisata maupun kebutuhan bisnis.',
    to: '/sewa',
    cta: 'Sewa Mobil Sekarang',
  },
  {
    icon: Landmark,
    title: 'Kredit & Pinjaman Dana',
    desc: 'Proses kredit cepat, DP ringan, serta layanan pinjam dana dengan jaminan BPKB kendaraan.',
    to: '/kredit-asuransi',
    cta: 'Ajukan Kredit',
  },
  {
    icon: ShieldCheck,
    title: 'Asuransi & Garansi',
    desc: 'Perlindungan menyeluruh dengan mitra asuransi terpercaya dan garansi mesin hingga 1 tahun.',
    to: '/kredit-asuransi',
    cta: 'Pelajari Proteksi',
  },
  {
    icon: SearchCheck,
    title: 'Inspeksi Mobil Profesional',
    desc: 'Tim teknisi berpengalaman memeriksa 120 titik untuk memastikan kondisi mobil benar-benar prima.',
    to: '/inspeksi',
    cta: 'Jadwalkan Inspeksi',
  },
]

export default function ServicesOverview() {
  return (
    <section className="relative bg-charcoal-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Solusi Mobilitas"
          highlight="Lengkap & Terpercaya"
          description={`Dari pembelian, pembiayaan, hingga perlindungan — ${SITE.brand} hadir untuk memenuhi seluruh kebutuhan otomotif Anda di Bali.`}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              className="glow-card group flex flex-col gap-4 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/20 to-ember-500/20 text-electric-400 ring-1 ring-white/10">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-white/55">{service.desc}</p>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-electric-400 group-hover:gap-2.5 transition-all">
                {service.cta} <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
