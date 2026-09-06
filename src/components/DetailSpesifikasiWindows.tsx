import { useState } from 'react'
import type { Mobil } from '../dataMobil'
import { SITE, waLink } from '../config/site'

interface DetailProps {
  mobilAktif: Mobil
}

export default function DetailSpesifikasiWindows({ mobilAktif }: DetailProps) {
  const [activeTab, setActiveTab] = useState<'performa' | 'fitur' | 'harga'>('performa')

  const handleHubungiSales = () => {
    const pesan = `Halo ${SITE.brand}, saya tertarik dengan unit *${mobilAktif.nama}* (${mobilAktif.tipe}) yang saya lihat di Showroom 4D Hybrid Web. Bisa dibantu informasi ketersediaan unit dan promo terbarunya? Terima kasih.`
    window.open(waLink(pesan), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden mt-6 text-slate-800">
      {/* WINDOWS TAB HEADER */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 flex items-center justify-between">
        <div className="flex gap-1 pt-3">
          {/* Button Performa */}
          <button
            onClick={() => setActiveTab('performa')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-t-2 transition-all ${
              activeTab === 'performa' ? 'bg-white border-amber-500 text-amber-600' : 'border-transparent text-stone-500 hover:bg-stone-100/50'
            }`}
          >
            ⚙️ Performa & Mesin
          </button>
          {/* Button Fitur */}
          <button
            onClick={() => setActiveTab('fitur')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-t-2 transition-all ${
              activeTab === 'fitur' ? 'bg-white border-amber-500 text-amber-600' : 'border-transparent text-stone-500 hover:bg-stone-100/50'
            }`}
          >
            🛡️ Fitur & Keamanan
          </button>
          {/* Button Harga */}
          <button
            onClick={() => setActiveTab('harga')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-t-2 transition-all ${
              activeTab === 'harga' ? 'bg-white border-amber-500 text-amber-600' : 'border-transparent text-stone-500 hover:bg-stone-100/50'
            }`}
          >
            💰 Estimasi Harga & Kredit
          </button>
        </div>
        <div className="text-xs font-mono text-stone-400 hidden sm:block">MoDeal Engine v2.0</div>
      </div>

      {/* WINDOWS CONTENT TAB CONTAINER */}
      <div className="p-6 min-h-[180px]">
        {activeTab === 'performa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Dapur Pacu</h4>
              <p className="text-lg font-bold text-stone-800 mb-4">{mobilAktif.spek}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1"><span>Efisiensi BBM</span><span className="text-amber-600 font-bold">{mobilAktif.efisiensi}</span></div>
                  <div className="w-full bg-stone-100 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full" style={{ width: mobilAktif.efisiensi }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1"><span>Akselerasi</span><span className="text-amber-600 font-bold">{mobilAktif.akselerasi}</span></div>
                  <div className="w-full bg-stone-100 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full" style={{ width: mobilAktif.akselerasi }}></div></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/5 to-transparent p-4 rounded-xl border border-stone-100 flex flex-col justify-center">
              <span className="text-xs text-stone-400 font-bold uppercase mb-1">Garansi Terjamin</span>
              <span className="text-base font-semibold text-stone-700">Free Service & Spareparts Rekanan Resmi Bali</span>
            </div>
          </div>
        )}

        {activeTab === 'fitur' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mobilAktif.fiturList.map((fitur, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 bg-stone-50 rounded-xl border border-stone-100/80">
                <span className="text-amber-500 text-sm">✦</span>
                <span className="text-sm font-medium text-stone-700">{fitur}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'harga' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/5 to-transparent p-5 rounded-xl border border-amber-500/10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Harga Unit OTR Bali</h4>
              <div className="text-3xl font-black text-stone-900">{mobilAktif.harga}</div>
              <p className="text-xs text-stone-400 mt-1">*Melayani tukar tambah (Trade-In) semua merk mobil bekas di Denpasar.</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-stone-400 font-medium">Paket Kredit DP Mulai</div>
              <div className="text-lg font-bold text-stone-700">10% - 15% dari OTR</div>
            </div>
          </div>
        )}
      </div>

      {/* WINDOWS FOOTER ACTION */}
      <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-stone-500">Unit Terpilih: <strong className="text-stone-700">{mobilAktif.nama}</strong></span>
        </div>
        <button
          onClick={handleHubungiSales}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
        >
          <span>💬</span> Ajukan Penawaran via WhatsApp
        </button>
      </div>
    </div>
  )
}
