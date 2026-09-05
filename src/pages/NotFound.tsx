import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-charcoal-950 px-4 text-center">
      <p className="font-display text-6xl font-black text-gradient-blue">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 max-w-md text-white/50">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Kembali ke Beranda
      </Link>
    </section>
  )
}
