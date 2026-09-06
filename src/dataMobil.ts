export interface Mobil {
  id: string
  nama: string
  tipe: string
  warnaBodi: string // Kode warna HEX untuk bodi 3D
  harga: string
  spek: string
  efisiensi: string
  akselerasi: string
  fiturList: string[]
}

export const KATALOG_MOBIL: Mobil[] = [
  {
    id: 'm1',
    nama: 'Expander Ultimate 2024',
    tipe: 'MPV Family',
    warnaBodi: '#ffffff', // Putih Mutiara
    harga: 'Rp 295 Juta',
    spek: '1.5L MIVEC DOHC 16-Valve | Automatic',
    efisiensi: '94%',
    akselerasi: '85%',
    fiturList: [
      'Smart Keyless Entry',
      '360° Camera View',
      'Active Stability Control',
      'Hologram Connect',
      'Dual SRS Airbags',
      'Cruise Control',
    ],
  },
  {
    id: 'm2',
    nama: 'HR-V RS Turbo',
    tipe: 'SUV Sporty',
    warnaBodi: '#b91c1c', // Merah Sporty
    harga: 'Rp 385 Juta',
    spek: '1.5L VTEC Turbo Engine | CVT with Paddle Shift',
    efisiensi: '88%',
    akselerasi: '95%',
    fiturList: [
      'Honda SENSING™',
      'Panoramic Glass Roof',
      'Hands-Free Power Tailgate',
      'Sporty Leather Seat',
      '6 Airbags System',
      'Sequential LED',
    ],
  },
  {
    id: 'm3',
    nama: 'Ioniq 5 Signature',
    tipe: 'Pure Electric',
    warnaBodi: '#475569', // Abu-abu Magnetik Titan
    harga: 'Rp 725 Juta',
    spek: 'Permanent Magnet Synchronous Motor | Liquid Cooled Lithium-ion',
    efisiensi: '99%',
    akselerasi: '92%',
    fiturList: [
      'Hyundai SmartSense',
      'V2L (Vehicle-to-Load)',
      'Premium Relaxation Seat',
      '12.3-inch Full TFT LCD',
      'Bose Premium Audio',
      'Eco-Friendly Materials',
    ],
  },
]
