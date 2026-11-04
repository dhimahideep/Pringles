'use client'

import React, { Suspense, forwardRef, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { PringlesCanScene } from './PringlesCanScene'

type CanvasSceneProps = {
  activeSlide?: number
}

// Single Pringles Can Rig for Flavor Slides (Slide 1, 2, 3)
function InteractiveCanRig({
  activeSlide,
  posX,
  posY,
  canScale,
}: {
  activeSlide: number
  posX: number
  posY: number
  canScale: number
}) {
  const isHero = activeSlide === 0
  const activeFlavor = Math.max(0, activeSlide - 1)
  const groupRef = useRef<THREE.Group>(null!)
  const scrollRotationY = useRef(0)
  const scrollTiltX = useRef(0)

  // Tie can rotation to scroll as user navigates flavors
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      scrollRotationY.current = (progress - 0.5) * 0.7
      scrollTiltX.current = (progress - 0.5) * 0.15
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // On Hero: glides off-screen (+3.2 X) and scales to 0
    // On Flavor Slides: glides smoothly into position [1.8, -0.4, 0] on desktop
    const targetX = isHero ? posX + 3.2 : posX
    const targetScale = isHero ? 0 : 1

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta)
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)

    // Mouse pointer tilt
    const mouseTiltY = state.pointer.x * 0.25
    const mouseTiltX = -state.pointer.y * 0.15

    // Idle floating hover
    const t = state.clock.getElapsedTime()
    const hoverY = Math.sin(t * 1.5) * 0.05
    const hoverRotZ = Math.cos(t * 1.2) * 0.02

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      scrollRotationY.current + mouseTiltY,
      4,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      scrollTiltX.current + mouseTiltX,
      4,
      delta
    )
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      hoverRotZ,
      4,
      delta
    )
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      posY + hoverY,
      4,
      delta
    )
  })

  return (
    <group ref={groupRef} position={[isHero ? posX + 3.2 : posX, posY, 0]} scale={isHero ? 0 : 1}>
      <PringlesCanScene activeFlavor={activeFlavor} canScale={canScale} />
    </group>
  )
}

const CanvasScene = forwardRef<THREE.Group, CanvasSceneProps>(
  function CanvasScene({ activeSlide = 0 }, _ref) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Desktop: positioned on right side at x=1.8, y=-0.4, scale=0.55
    // Mobile: centered at x=0, pushed down into bottom half at y=-1.2, scale=0.35
    const posX = isMobile ? 0 : 1.8
    const posY = isMobile ? -1.2 : -0.4
    const canScale = isMobile ? 0.35 : 0.55
    const shadowY = isMobile ? -1.8 : -1.9
    const shadowScale = isMobile ? 3.5 : 5
    const isHero = activeSlide === 0

    return (
      <div className="fixed inset-0 z-20 w-screen h-screen pointer-events-none">
        <Canvas
          className="pointer-events-none w-full h-full"
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, toneMappingExposure: 0.9 }}
          camera={{ position: [0, 0, 7], fov: 40 }}
        >
          {/* Studio Lights tuned to eliminate milky wash-out */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 3, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[5, 6, 4]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-4, 4, 3]} intensity={0.5} color="#ffffff" />
          <directionalLight position={[0, -2, -4]} intensity={0.3} color="#ffffff" />

          {/* Studio Environment with reduced intensity to avoid wash-out reflections */}
          <Environment preset="studio" environmentIntensity={0.35} />

          {/* Contact Shadows for Flavor Can */}
          <ContactShadows
            position={[posX, shadowY, 0]}
            opacity={isHero ? 0 : 0.65}
            scale={shadowScale}
            blur={2.4}
            far={3.5}
            color="#000000"
          />

          <Suspense fallback={null}>
            {/* Flavor Can: locked on right for desktop, centered upper for mobile */}
            <InteractiveCanRig
              activeSlide={activeSlide}
              posX={posX}
              posY={posY}
              canScale={canScale}
            />
          </Suspense>
        </Canvas>
      </div>
    )
  }
)

CanvasScene.displayName = 'CanvasScene'
export default CanvasScene
