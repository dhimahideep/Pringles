'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { PringlesLogo } from './PringlesLogo'

function LogoRig({ scale = 2.4 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const mousePos = useRef({ x: 0, y: 0 })

  // Listen to global window mouse movement so cursor tracking works everywhere
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // ── Smooth Left-to-Right Oscillating Rotation (No Bouncing) ─────────
    // Gentle, smooth sinusoidal rotation left to right and vice versa (approx ±16 degrees)
    const oscillateY = Math.sin(t * 1.4) * 0.28

    // Interactive Cursor Follow
    const mouseFollowY = mousePos.current.x * 0.2
    const mouseFollowX = -mousePos.current.y * 0.15

    // Steady Y position (no vertical bouncing, lifted slightly up)
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      0.22,
      3.5,
      delta
    )

    // Left-to-right oscillating rotation
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      oscillateY + mouseFollowY,
      3.5,
      delta
    )

    // Very subtle natural pitch & tilt
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      mouseFollowX,
      3.5,
      delta
    )
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      Math.cos(t * 1.4) * 0.03,
      3.5,
      delta
    )

    // Stable scale without squash/stretch
    groupRef.current.scale.set(scale, scale, scale)
  })

  return (
    <group ref={groupRef}>
      <Center>
        {/* Normalized mesh scaled with animated rig */}
        <PringlesLogo scale={1 / 28} />
      </Center>
    </group>
  )
}

export default function HeroLogoCanvas() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scaled up to be more bold and prominent
  const logoScale = isDesktop ? 3.3 : 2.85

  return (
    <div className="w-full h-full relative">
      <Canvas
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 0.95 }}
        camera={{ position: [0, 0, 4.4], fov: 42 }}
      >
        {/* Calibrated Studio Lighting — Rich & Saturated Colors */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 3, 5]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[5, 5, 4]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-4, 4, 3]} intensity={0.5} color="#ffffff" />
        <Environment preset="studio" environmentIntensity={0.35} />

        <Suspense fallback={null}>
          <LogoRig scale={logoScale} />
        </Suspense>
      </Canvas>
    </div>
  )
}
