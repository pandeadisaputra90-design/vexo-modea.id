import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { KATALOG_MOBIL, type Mobil } from './dataMobil'
import JarvisCustomFloor from './components/JarvisCustomFloor'
import DetailSpesifikasiWindows from './components/DetailSpesifikasiWindows'

// Komponen 3D Model Mobil Dinamis Responsif Warna
function ModelMobilDinamis({ mobilAktif }: { mobilAktif: Mobil }) {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2.5, 0.6, 1.3]} />
        <meshStandardMaterial color={mobilAktif.warnaBodi} roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.45, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.1]} />
        <meshStandardMaterial color="#0a192f" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

export default function ShowroomUtama() {
  const [mobilDipilih, setMobilDipilih] = useState<Mobil>(KATALOG_MOBIL[0])

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-stone-50 px-4 pb-4 pt-28 md:px-6 md:pb-6 md:pt-32">
      <header className="mb-6 flex justify-between items-center border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-stone-900">MODEAL AUTO BALI</h1>
          <p className="text-xs text-stone-400 font-medium">Hybrid App UI Framework v2.0</p>
        </div>
        <div className="px-3 py-1.5 bg-amber-500/10 text-amber-700 font-bold rounded-lg text-xs border border-amber-500/20">📍 Denpasar, Bali</div>
      </header>

      {/* GRID UTAMA TAB LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* PANEL KIRI: Menu Katalog Pilihan Mobil (Efisien ala Windows Sidebar) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 px-1">Katalog Unit</h3>
          {KATALOG_MOBIL.map((mobil) => (
            <button
              key={mobil.id}
              onClick={() => setMobilDipilih(mobil)}
              className={`p-4 rounded-xl text-left transition-all border flex flex-col gap-1 w-full ${
                mobilDipilih.id === mobil.id
                  ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/5'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="font-bold text-stone-800 text-base">{mobil.nama}</div>
              <div className="text-xs text-stone-500 flex justify-between w-full mt-1">
                <span>{mobil.tipe}</span>
                <span className="text-amber-600 font-bold">{mobil.harga}</span>
              </div>
            </button>
          ))}
        </div>

        {/* PANEL KANAN: Kanvas Preview 4D Orbit Hologram JARVIS */}
        <div className="flex-1 h-[500px] relative rounded-2xl overflow-hidden shadow-lg border border-amber-200/40 bg-gradient-to-b from-stone-100 via-amber-50 to-stone-200">
          <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }}>
            <ambientLight intensity={0.9} color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={2.0} color="#fff1d6" />
            <pointLight position={[-5, 5, -5]} intensity={1.2} color="#ffffff" />

            {/* Panggung Robotik JARVIS Custom */}
            <JarvisCustomFloor />

            {/* Objek Mobil */}
            <ModelMobilDinamis mobilAktif={mobilDipilih} />

            {/* Lapisan Lantai Dasar Marmer */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
              <circleGeometry args={[3.2, 64]} />
              <meshStandardMaterial color="#fcfbf7" roughness={0.08} metalness={0.1} />
            </mesh>

            <OrbitControls enablePan={false} minDistance={4} maxDistance={8} maxPolarAngle={Math.PI / 2 - 0.05} />
          </Canvas>

          <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md text-amber-800 px-3 py-1 rounded-lg text-xs border border-amber-500/20 font-bold">
            🔄 Geser Layar 360° / 4D Angle
          </div>
        </div>
      </div>

      {/* PANEL BAWAH: Menu Detail Tab Bar Windows */}
      <DetailSpesifikasiWindows mobilAktif={mobilDipilih} />
    </div>
  )
}
