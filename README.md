# MoDeal Auto Bali

Trusted car solution di Denpasar, Bali — website showroom mobil bekas premium dengan nuansa futuristik: dark charcoal, aksen electric blue & orange, glassmorphism, dan galeri kendaraan 3D-style yang bisa diputar interaktif.

## Tech Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [React Router](https://reactrouter.com/) untuk navigasi antar halaman
- [Lucide React](https://lucide.dev/) untuk ikon

## Menjalankan Proyek

```bash
npm install
npm run dev       # development server
npm run build     # production build ke folder dist/
npm run preview   # preview hasil build
```

## Struktur Halaman

- `/` — Beranda: hero cinematic, showcase kendaraan 3D, layanan, unit unggulan, testimoni
- `/katalog` — Katalog mobil dengan filter merek, harga, tahun, transmisi, bahan bakar, tipe body
- `/katalog/:id` — Detail mobil: galeri, spesifikasi, estimasi kredit, CTA WhatsApp
- `/sewa` — Rental mobil harian & bulanan
- `/kredit-asuransi` — Kredit mobil, pinjaman dana, asuransi & garansi
- `/inspeksi` — Proses inspeksi mobil profesional
- `/tentang` — Tentang MoDeal Auto Bali
- `/kontak` — Lokasi, WhatsApp, form kontak, dan peta

## Mengelola Data Kendaraan

Semua data ditempatkan di `src/data/` agar mudah diperbarui tanpa menyentuh komponen UI:

- `src/data/vehicles.ts` — daftar unit mobil dijual (tambah/edit objek `Vehicle` di array `VEHICLES`)
- `src/data/rentals.ts` — daftar unit mobil rental
- `src/data/testimonials.ts` — testimoni pelanggan & statistik kepercayaan
- `src/data/constants.ts` — info bisnis (alamat, nomor WhatsApp, jam operasional, dll)

Setiap kendaraan memakai komponen `VehicleCard` yang reusable, dan gambar unit saat ini memakai ilustrasi blueprint bergaya futuristik (`src/components/ui/VehicleArt.tsx`) yang di-generate otomatis berdasarkan tipe body & warna aksen — siap diganti dengan foto asli kapan saja dengan menambahkan field gambar pada tipe `Vehicle`.
