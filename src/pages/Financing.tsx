import { useMemo, useState } from 'react'
import { Wallet, ShieldCheck, BadgeCheck, FileText, PhoneCall, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import { SITE, waLink } from '../config/site'
import { estimateMonthlyInstallment, formatIDR } from '../data/constants'

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

const SERVICES = [
  { id: 'kredit', icon: FileText, title: 'Kredit Mobil', teaser: 'Simulasi DP & cicilan otomatis' },
  { id: 'pinjaman', icon: Wallet, title: 'Pinjam Dana BPKB', teaser: 'Dana cepat jaminan BPKB' },
  { id: 'asuransi', icon: ShieldCheck, title: 'Asuransi Mobil', teaser: 'Proteksi All Risk & TLO' },
  { id: 'garansi', icon: BadgeCheck, title: 'Garansi Mobil', teaser: 'Garansi mesin hingga 12 bulan' },
] as const

type ServiceId = (typeof SERVICES)[number]['id']

export default function Financing() {
  const [activeService, setActiveService] = useState<ServiceId>('kredit')

  // Kalkulator angsuran mandiri — tidak terikat unit tertentu.
  const [hargaMobil, setHargaMobil] = useState(300_000_000)
  const [dpPercent, setDpPercent] = useState(0.3)
  const [tenor, setTenor] = useState(36)

  const { dp, installment } = useMemo(
    () => estimateMonthlyInstallment(hargaMobil, tenor, dpPercent),
    [hargaMobil, tenor, dpPercent],
  )

  const activeMeta = SERVICES.find((s) => s.id === activeService)!

  return (
    <>
      <PageHero
        eyebrow="Kredit, Pinjaman & Proteksi"
        title="Kredit Mobil, Asuransi, dan Garansi Terpercaya"
        description="Wujudkan mobil impian dengan proses kredit mudah, atau dapatkan dana tambahan dengan jaminan BPKB — dilengkapi proteksi asuransi dan garansi."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton message={`Halo ${SITE.brand}, saya ingin mengajukan kredit mobil.`} label="Ajukan Kredit" />
          <WhatsAppButton
            variant="outline"
            message={`Halo ${SITE.brand}, saya ingin bertanya soal pinjam dana jaminan BPKB.`}
            label="Tanya Pinjaman Dana"
          />
        </div>
      </PageHero>

      <section className="relative bg-charcoal-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Layanan Finansial & Garansi"
            title="Pilih Layanan"
            highlight="yang Anda Butuhkan"
            description="Klik salah satu kartu untuk melihat detail, simulasi, dan cara pengajuannya."
          />

          {/* INTERACTIVE SERVICE TOGGLES */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const isActive = service.id === activeService
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service.id)}
                  className={`flex flex-col gap-3 rounded-2xl border p-6 text-left transition-all ${
                    isActive
                      ? 'border-electric-500/60 bg-white/[0.04] shadow-glow-blue'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-white/10 ${
                      isActive ? 'bg-electric-500/15 text-electric-400' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`font-display text-base font-bold ${isActive ? 'text-white' : 'text-white/70'}`}>{service.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{service.teaser}</p>
                </button>
              )
            })}
          </div>

          {/* DETAIL PANEL — berubah sesuai layanan yang dipilih */}
          <div className="mt-8 glass-card p-6 sm:p-8">
            {activeService === 'kredit' && (
              <div>
                <h3 className="font-display text-xl font-bold text-white">Proses Kredit Cepat &amp; Mudah</h3>
                <p className="mt-2 text-sm text-white/55">Cukup 4 langkah sederhana, mobil impian bisa langsung Anda bawa pulang.</p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {CREDIT_STEPS.map((step, i) => (
                    <div key={step.title} className="relative flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <span className="font-display text-2xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-500/10 text-electric-400">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>
                    </div>
                  ))}
                </div>

                {/* KALKULATOR ANGSURAN MANDIRI */}
                <div className="mt-10 rounded-2xl border border-electric-500/20 bg-electric-500/5 p-6">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-electric-300">Kalkulator Angsuran Mandiri</h4>
                  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="flex justify-between text-xs text-white/50">
                          <span>Harga Mobil</span>
                          <span className="font-semibold text-white">{formatIDR(hargaMobil)}</span>
                        </div>
                        <input
                          type="range"
                          min={50_000_000}
                          max={1_000_000_000}
                          step={5_000_000}
                          value={hargaMobil}
                          onChange={(e) => setHargaMobil(Number(e.target.value))}
                          className="mt-2 w-full accent-electric-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-white/50">
                          <span>Uang Muka (DP)</span>
                          <span className="font-semibold text-white">{Math.round(dpPercent * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min={0.1}
                          max={0.6}
                          step={0.05}
                          value={dpPercent}
                          onChange={(e) => setDpPercent(Number(e.target.value))}
                          className="mt-2 w-full accent-electric-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-white/50">
                          <span>Tenor</span>
                          <span className="font-semibold text-white">{tenor} Bulan</span>
                        </div>
                        <input
                          type="range"
                          min={12}
                          max={60}
                          step={12}
                          value={tenor}
                          onChange={(e) => setTenor(Number(e.target.value))}
                          className="mt-2 w-full accent-electric-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3 rounded-xl border border-white/10 bg-charcoal-950/60 p-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Uang Muka</span>
                        <span className="font-semibold text-white">{formatIDR(dp)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Cicilan / Bulan</span>
                        <span className="font-display text-xl font-bold text-electric-300">{formatIDR(installment)}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/35">
                        *Estimasi asumsi bunga flat 7%/tahun, hanya simulasi. Nilai akhir mengikuti persetujuan mitra leasing/bank.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={waLink(
                    `Halo ${SITE.brand}, saya ingin ajukan kredit mobil dengan estimasi harga ${formatIDR(hargaMobil)}, DP ${Math.round(
                      dpPercent * 100,
                    )}% (${formatIDR(dp)}), tenor ${tenor} bulan. Estimasi cicilan ${formatIDR(installment)}/bulan. Mohon dibantu prosesnya.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 w-full sm:w-auto"
                >
                  Ajukan Kredit Sesuai Simulasi Ini
                </a>
              </div>
            )}

            {activeService === 'pinjaman' && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">Pinjam Dana Jaminan BPKB</h3>
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
                  message={`Halo ${SITE.brand}, saya ingin ajukan pinjaman dana jaminan BPKB mobil.`}
                  label="Ajukan Pinjaman Dana"
                  className="mt-6 w-full sm:w-auto"
                />
              </div>
            )}

            {activeService === 'asuransi' && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">Asuransi Mobil Bekas</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Setiap pembelian mobil bekas di {SITE.brand} bisa dilengkapi asuransi resmi untuk ketenangan berkendara.
                </p>
                <ul className="mt-6 space-y-3">
                  {INSURANCE_BENEFITS.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-400" /> {item}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  message={`Halo ${SITE.brand}, saya ingin tanya soal asuransi mobil bekas.`}
                  label="Konsultasi Asuransi"
                  className="mt-6 w-full sm:w-auto"
                />
              </div>
            )}

            {activeService === 'garansi' && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-400 ring-1 ring-white/10">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">Garansi Mobil Bekas</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Beli lebih tenang — setiap unit bisa dilengkapi garansi resmi dari {SITE.brand}.
                </p>
                <ul className="mt-6 space-y-3">
                  {WARRANTY_BENEFITS.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-ember-400" /> {item}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  message={`Halo ${SITE.brand}, saya ingin tanya soal garansi mobil bekas.`}
                  label="Konsultasi Garansi"
                  className="mt-6 w-full sm:w-auto"
                />
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-xs text-white/30 lg:text-left">
            Sedang melihat: <span className="text-white/50">{activeMeta.title}</span>
          </p>
        </div>
      </section>
    </>
  )
}
