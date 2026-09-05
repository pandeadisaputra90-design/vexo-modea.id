import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Navigation } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { SITE, waLink } from '../config/site'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('Beli Mobil')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Halo ${SITE.brand}, perkenalkan saya ${name || '-'} (${phone || '-'}).\nTopik: ${topic}\nPesan: ${
      message || '-'
    }`
    window.open(waLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Kami Siap Membantu Anda"
        description="Kunjungi showroom kami di Denpasar atau hubungi tim melalui WhatsApp, telepon, maupun form di bawah ini."
      />

      <section className="relative bg-charcoal-950 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card space-y-5 p-6">
              <ContactRow icon={Phone} label="Telepon / WhatsApp" value={SITE.phone} href={waLink()} />
              <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            </div>

            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-white">Kirim Pertanyaan</h2>
              <p className="mt-2 text-sm text-white/50">
                Isi form berikut, pesan akan langsung diteruskan ke WhatsApp tim kami untuk respon cepat.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Nama Lengkap</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Nama Anda"
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/50">No. WhatsApp</label>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Topik</label>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input-field">
                    {['Beli Mobil', 'Jual Mobil', 'Sewa Mobil', 'Kredit & Pinjaman Dana', 'Asuransi & Garansi', 'Inspeksi Mobil', 'Lainnya'].map(
                      (t) => (
                        <option key={t} value={t} className="bg-charcoal-900">
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Pesan</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" /> Kirim via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Lokasi & Kontak" title="Kunjungi Showroom" highlight="Kami di Denpasar" />

          <div className="glass-card mt-12 grid grid-cols-1 overflow-hidden lg:grid-cols-2">
            <iframe
              src={SITE.mapsEmbed}
              title={`Lokasi ${SITE.brand}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 lg:h-full lg:min-h-[360px]"
            />
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40">Alamat Showroom</p>
                  <p className="text-sm font-medium text-white/85">{SITE.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40">Jam Operasional</p>
                  <p className="text-sm font-medium text-white/85">{SITE.hours}</p>
                </div>
              </div>
              <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline w-fit">
                <Navigation className="h-4 w-4" /> Buka di Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/40">{label}</p>
        <p className="text-sm font-medium text-white/85">{value}</p>
      </div>
    </div>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80">
        {content}
      </a>
    )
  }
  return content
}
