import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function JarvisCustomFloor() {
  const coreDomeRef = useRef<THREE.Mesh>(null)
  const mechanicalRingRef = useRef<THREE.Mesh>(null)
  const outerWaveRingRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // 1. Bola Geodesik Jaring Segitiga di Inti Tengah (Warna Putih Bersih)
    if (coreDomeRef.current) {
      coreDomeRef.current.rotation.y = time * 0.15
    }

    // 2. Ring Mekanis Tebal Bersegmen Kotak (Warna Emas Pekat)
    if (mechanicalRingRef.current) {
      mechanicalRingRef.current.rotation.z = -time * 0.2
    }

    // 3. Gelombang Lingkaran Partikel Energi Luar (Warna Emas Menyala)
    if (outerWaveRingRef.current) {
      outerWaveRingRef.current.rotation.z = time * 0.08
      const positions = outerWaveRingRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const dist = Math.sqrt(x * x + y * y)
        positions[i + 2] = Math.sin(dist * 2.5 - time * 4) * 0.06
      }
      outerWaveRingRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Konstruksi arsitektur partikel sirkular dari gambar referensi JARVIS
  const customWaveParticles = useMemo(() => {
    const count = 800
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radiusNoise = 2.3 + Math.random() * 0.2
      array[i * 3] = Math.cos(angle) * radiusNoise
      array[i * 3 + 1] = Math.sin(angle) * radiusNoise
      array[i * 3 + 2] = 0
    }
    return array
  }, [])

  return (
    <group position={[0, -0.07, 0]}>
      {/* ⚪ KELOMPOK 1: Inti Bola Geodesik Jaring Segitiga */}
      <mesh ref={coreDomeRef} rotation={[Math.PI / 2, 0, 0]}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[1.06, 1.09, 64]} />
        <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* 🟡 KELOMPOK 2: Ring Mekanis Bersegmen Kotak Tebal (Sirkuit) */}
      <mesh ref={mechanicalRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.35, 1.75, 40]} />
        <meshBasicMaterial color="#b38b1b" wireframe side={THREE.DoubleSide} transparent opacity={0.55} />
      </mesh>

      {/* 🟡 KELOMPOK 3: Efek Kabut Gelombang Partikel Luar */}
      <points ref={outerWaveRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[customWaveParticles, 3]}
            count={800}
            array={customWaveParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#d4af37" size={0.035} transparent opacity={0.75} sizeAttenuation={true} />
      </points>
    </group>
  )
}
