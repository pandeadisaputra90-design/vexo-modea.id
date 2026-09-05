import { Landmark, Wallet, ShieldCheck, BadgeCheck, FileText, PhoneCall, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import WhatsAppButton from '../components/ui/WhatsAppButton'

const CREDIT_STEPS = [
  { icon: FileText, title: 'Ajukan & Lengkapi Dokumen', desc: 'Isi form pengajuan dan lengkapi KTP, KK, serta slip gaji/rekening koran.' },
  { icon: PhoneCall, title: 'Survey & Verifikasi', desc: 'Tim kami atau mitra leasing melakukan verifikasi data dalam 1x24 jam.' },
  { icon: BadgeCheck, title: 'Persetujuan Kredit', desc: 'Setelah disetujui, tentukan DP dan tenor sesuai kemampuan Anda.' },
  { icon: CheckCircle2, title: 'Serah Terima Mobil', desc: 'Tanda tangan kontrak dan mobil siap dibawa pulang hari itu juga.' },
]

const INSURANCE_BENEFITS = [
  'Perlindungan All Risk & Total Loss Only (TLO)',
  'Klaim kerusakan akibat kecelakaan, banjir, dan bencana alam',
  'Layanan derek darurat 24 jam di seluruh Bali',
  'Kemitraan dengan asuransi terpercaya berskala nasional',
]

const WARRANTY_BENEFITS = [
  'Garansi mesin & transmisi hingga 12 bulan',
  'Garansi kelistrikan dan AC hingga 6 bulan',
  'Gratis servis berkala pertama di bengkel rekanan',
  'Tim teknisi siap bantu konsultasi purna jual',
]

const LOAN_HIGHLIGHTS = [
  { label: 'Plafon Pinjaman', value: 'Hingga 80% nilai BPKB' },
  { label: 'Proses', value: 'Cepat, cair dalam 1-2 hari kerja' },
  { label: 'Tenor', value: 'Fleksibel 12 - 60 bulan' },
  { label: 'Bunga', value: 'Kompetitif & transparan' },
]

export default function Financing() {
  return (
    <>
      <PageHero
        eyebrow="Kredit, Pinjaman & Proteksi"
        title="Kredit Mobil, Asuransi, dan Garansi Terpercaya"
        description="Wujudkan mobil impian dengan proses kredit mudah, atau dapatkan dana tambahan dengan jaminan BPKB — dilengkapi proteksi asuransi dan garansi."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton message="Halo MoDeal Auto Bali, saya ingin mengajukan kredit mobil." label="Ajukan Kredit" />
          <WhatsAppButton
            variant="outline"
            message="Halo MoDeal Auto Bali, saya ingin bertanya soal pinjam dana jaminan BPKB."
            label="Tanya Pinjaman Dana"
          />
        </div>
      </PageHero>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kredit Mobil"
            title="Proses Kredit"
            highlight="Cepat & Mudah"
            description="Cukup 4 langkah sederhana, mobil impian bisa langsung Anda bawa pulang."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CREDIT_STEPS.map((step, i) => (
              <div key={step.title} className="glow-card relative flex flex-col gap-3 p-6">
                <span className="font-display text-4xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Pinjam Dana Jaminan BPKB</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Butuh dana cepat untuk kebutuhan usaha, pendidikan, atau mendesak? Gadaikan BPKB mobil Anda tanpa perlu
                menyerahkan unit fisiknya — mobil tetap bisa digunakan sehari-hari.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {LOAN_HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-wider text-white/40">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <WhatsAppButton
                message="Halo MoDeal Auto Bali, saya ingin ajukan pinjaman dana jaminan BPKB mobil."
                label="Ajukan Pinjaman Dana"
                className="mt-6 w-full"
              />
            </div>

            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Simulasi Kredit Ringkas</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Setiap unit di katalog kami sudah dilengkapi estimasi cicilan otomatis. Pilih mobil favorit Anda dan atur
                simulasi DP serta tenor langsung di halaman detail mobil.
              </p>
              <ul className="mt-6 space-y-3">
                {['DP mulai dari 10%', 'Tenor fleksibel 12 - 60 bulan', 'Bekerja sama dengan multi-leasing & bank', 'Bunga bersaing & transparan'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-400" /> {item}
                    </li>
                  ),
                )}
              </ul>
              <a href="/katalog" className="btn-outline mt-6 w-full">
                Lihat Katalog & Simulasi
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Asuransi & Garansi"
            title="Proteksi Menyeluruh"
            highlight="untuk Ketenangan Anda"
            description="Setiap pembelian mobil bekas di MoDeal Auto Bali bisa dilengkapi asuransi dan garansi resmi."
          />
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="glow-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Asuransi Mobil Bekas</h3>
              <ul className="mt-4 space-y-3">
                {INSURANCE_BENEFITS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glow-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">Garansi Mobil Bekas</h3>
              <ul className="mt-4 space-y-3">
                {WARRANTY_BENEFITS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-ember-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center">
            <WhatsAppButton message="Halo MoDeal Auto Bali, saya ingin tanya soal asuransi dan garansi mobil bekas." label="Konsultasi via WhatsApp" />
          </div>
        </div>
      </section>
    </>
  )
}
