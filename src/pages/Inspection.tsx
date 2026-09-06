import {
  CalendarClock,
  ClipboardList,
  Wrench,
  FileBadge2,
  Gauge,
  Cog,
  BatteryCharging,
  PaintBucket,
  CircleDot,
  Sparkles,
  Search,
  Cpu,
  ScrollText,
  Route,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import { SITE } from '../config/site'

const PROCESS = [
  {
    icon: CalendarClock,
    title: 'Jadwalkan Inspeksi',
    desc: 'Hubungi tim kami via WhatsApp dan tentukan waktu inspeksi sesuai jadwal Anda.',
  },
  {
    icon: ClipboardList,
    title: 'Pemeriksaan 150+ Titik',
    desc: 'Tim teknisi profesional memeriksa mesin, kaki-kaki, kelistrikan, hingga eksterior & interior.',
  },
  {
    icon: Wrench,
    title: 'Uji Jalan (Test Drive)',
    desc: 'Evaluasi performa berkendara nyata untuk memastikan mobil bebas dari masalah tersembunyi.',
  },
  {
    icon: FileBadge2,
    title: 'Laporan Inspeksi Lengkap',
    desc: 'Anda menerima laporan detail kondisi mobil sebagai dasar keputusan pembelian yang tepat.',
  },
]

const TECH_TIMELINE = [
  {
    icon: Search,
    title: 'Inspeksi Visual & Fisik',
    desc: 'Pemeriksaan menyeluruh kondisi bodi, cat, rangka, dan interior untuk mendeteksi bekas benturan atau kerusakan tersembunyi.',
  },
  {
    icon: Cpu,
    title: 'OBD Engine Scanner',
    desc: 'Komputerisasi diagnosa ECU kelistrikan internal mobil untuk meminimalisir error malfungsi.',
  },
  {
    icon: ScrollText,
    title: 'Rapor Laporan Legal',
    desc: 'Penerbitan berkas sertifikat resmi transparansi kelayakan nilai riil jual beli kendaraan.',
  },
  {
    icon: Route,
    title: 'Uji Jalan & Serah Terima Hasil',
    desc: 'Test drive akhir untuk validasi performa berkendara, dilanjutkan serah terima laporan lengkap ke konsumen.',
  },
]

const CHECK_CATEGORIES = [
  { icon: Cog, title: 'Mesin & Transmisi', desc: 'Kompresi mesin, kebocoran oli, suara mesin, dan performa transmisi.' },
  { icon: Gauge, title: 'Kaki-Kaki & Suspensi', desc: 'Sistem rem, ban, shockbreaker, dan keselarasan roda (wheel alignment).' },
  { icon: BatteryCharging, title: 'Kelistrikan', desc: 'Aki, alternator, sistem AC, audio, serta seluruh fitur elektronik.' },
  { icon: PaintBucket, title: 'Eksterior & Cat', desc: 'Ketebalan cat, bekas tabrakan, karat, dan kondisi bodi keseluruhan.' },
  { icon: CircleDot, title: 'Interior & Kenyamanan', desc: 'Jok, dashboard, karpet, serta fungsi seluruh tombol dan panel.' },
  { icon: Sparkles, title: 'Legalitas Dokumen', desc: 'Kesesuaian nomor rangka/mesin, STNK, BPKB, dan riwayat pajak kendaraan.' },
]

export default function Inspection() {
  return (
    <>
      <PageHero
        eyebrow="Inspeksi Mobil Profesional"
        title="Beli Mobil Bekas Tanpa Ragu"
        description="Tim inspeksi bersertifikat kami memeriksa setiap detail kendaraan agar Anda mendapatkan mobil dengan kondisi yang benar-benar sesuai harapan."
      >
        <div className="mt-8">
          <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin menjadwalkan inspeksi mobil.`} label="Jadwalkan Inspeksi" />
        </div>
      </PageHero>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Alur Inspeksi"
            title="Proses Inspeksi"
            highlight="Transparan & Profesional"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="glow-card relative flex flex-col gap-3 p-6">
                <span className="font-display text-4xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-electric-500/50 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Metodologi & Teknologi"
            title="Timeline Inspeksi"
            highlight="Berbasis Teknologi"
            description="Kombinasi pemeriksaan manual dan alat diagnosa digital untuk hasil yang akurat dan transparan."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_TIMELINE.map((step, i) => (
              <div key={step.title} className="glow-card relative flex flex-col gap-3 p-6">
                <span className="font-display text-4xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.desc}</p>
                {i < TECH_TIMELINE.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-ember-500/50 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cakupan Pemeriksaan"
            title="150+ Titik Pemeriksaan"
            highlight="Menyeluruh"
            description="Setiap kategori diperiksa oleh teknisi berpengalaman menggunakan standar checklist ketat."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHECK_CATEGORIES.map((cat) => (
              <div key={cat.title} className="glass-card flex flex-col gap-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-white">{cat.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ingin Mobil Anda <span className="text-gradient-blue">Diinspeksi</span> Sebelum Dibeli?
          </h2>
          <p className="mt-4 text-white/60">
            Layanan inspeksi kami juga terbuka untuk mobil dari penjual perorangan di luar showroom kami. Jadwalkan sekarang.
          </p>
          <div className="mt-8">
            <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin menjadwalkan inspeksi mobil.`} label="Jadwalkan Inspeksi Sekarang" />
          </div>
        </div>
      </section>
    </>
  )
}
