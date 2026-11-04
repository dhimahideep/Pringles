'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_state, delta) => {
    meshRef.current.rotation.x += delta * 0.4
    meshRef.current.rotation.y += delta * 0.6
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.6} />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      className="rounded-2xl"
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingBox />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  )
}
