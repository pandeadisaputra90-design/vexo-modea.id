/**
 * Single source of truth for every piece of contact/business data used
 * across the site (navbar, footer, WhatsApp CTAs, contact page, meta
 * tags, JSON-LD, ...). Update values here only — never hardcode them
 * in a component.
 */

const brand = 'MoDeal Auto Bali'

export interface SiteSocial {
  instagram: string
  tiktok: string
  facebook: string
  youtube: string
}

export interface SiteConfig {
  brand: string
  tagline: string
  description: string
  url: string
  whatsapp: string
  waDefaultMsg: string
  phone: string
  email: string
  address: string
  mapsEmbed: string
  mapsLink: string
  hours: string
  ogImage: string
  social: SiteSocial
}

export const SITE: SiteConfig = {
  brand,
  tagline: 'Trusted car solution di Denpasar, Bali.',
  description:
    'Jual beli mobil bekas berkualitas, rental mobil terpercaya, kredit & asuransi, hingga inspeksi profesional di Denpasar, Bali.',
  url: 'https://modealautobali.id',
  whatsapp: '6281234567890', // format 62, tanpa +
  waDefaultMsg: `Halo ${brand}, saya mau tanya unit`,
  phone: '+62 812-3456-7890',
  email: 'halo@modealautobali.id',
  address: 'Jl. cekomaria Gg. Gustiwa XG blk. C No.168x, Penatih Denpasar Timur, Kota Denpasar, Bali 80115',
  mapsEmbed:
    'https://www.google.com/maps?q=Jl.+cekomaria+Gg.+Gustiwa+XG+blk.+C+No.168x+Penatih+Denpasar+Timur+Kota+Denpasar+Bali+80115&output=embed',
  mapsLink: 'https://maps.app.goo.gl/9vED4KsSDVqTDeW97',
  hours: 'Senin–Jumat 08.30–20.00 WITA, Sabtu–Minggu 09.00–18.00 WITA',
  ogImage: '/og-image.png',
  social: {
    instagram: 'https://instagram.com/modealautobali',
    tiktok: 'https://tiktok.com/@modealautobali',
    facebook: 'https://facebook.com/modealautobali',
    youtube: '',
  },
}

/** Builds a wa.me deep link, defaulting to SITE.waDefaultMsg when no message is given. */
export function waLink(message: string = SITE.waDefaultMsg) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export interface WaVehicleInfo {
  brand: string
  model: string
  year: number
  plat: string
}

/** The auto-generated "minat unit" message used on vehicle detail pages. */
export function buildVehicleWaMessage(vehicle: WaVehicleInfo) {
  return `Halo ${SITE.brand}, saya minat ${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${vehicle.plat}. Masih ready?`
}

/** Builds the wa.me link for a specific unit's auto-generated interest message. */
export function waVehicleLink(vehicle: WaVehicleInfo) {
  return waLink(buildVehicleWaMessage(vehicle))
}
