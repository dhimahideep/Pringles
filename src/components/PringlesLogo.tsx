'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    polySurface1_lambert9_0: THREE.Mesh
    polySurface1_lambert20_0: THREE.Mesh
    polySurface1_anisotropic5_0: THREE.Mesh
    polySurface48_anisotropic4_0: THREE.Mesh
    polySurface49_anisotropic6_0: THREE.Mesh
    pDisc1_phong4_0: THREE.Mesh
    polySurface27_lambert10_0: THREE.Mesh
    polySurface27_lambert8_0: THREE.Mesh
    polySurface27_lambert11_0: THREE.Mesh
    polySurface41_anisotropic3_0: THREE.Mesh
    polySurface42_lambert21_0: THREE.Mesh
    polySurface43_anisotropic3_0: THREE.Mesh
    polySurface44_anisotropic3_0: THREE.Mesh
    polySurface45_lambert4_0: THREE.Mesh
    polySurface46_anisotropic3_0: THREE.Mesh
    polySurface47_anisotropic3_0: THREE.Mesh
    polySurface30_lambert19_0: THREE.Mesh
    polySurface31_lambert18_0: THREE.Mesh
    polySurface32_lambert17_0: THREE.Mesh
    polySurface33_lambert19_0: THREE.Mesh
    polySurface34_lambert16_0: THREE.Mesh
    polySurface35_lambert16_0: THREE.Mesh
    polySurface36_lambert16_0: THREE.Mesh
    polySurface37_lambert16_0: THREE.Mesh
    polySurface38_lambert16_0: THREE.Mesh
    polySurface39_lambert16_0: THREE.Mesh
    polySurface40_lambert16_0: THREE.Mesh
    pDisc3_phong4_0: THREE.Mesh
  }
  materials: {
    lambert9: THREE.MeshStandardMaterial
    lambert20: THREE.MeshStandardMaterial
    anisotropic5: THREE.MeshStandardMaterial
    anisotropic4: THREE.MeshStandardMaterial
    anisotropic6: THREE.MeshStandardMaterial
    phong4: THREE.MeshStandardMaterial
    lambert10: THREE.MeshStandardMaterial
    lambert8: THREE.MeshStandardMaterial
    lambert11: THREE.MeshStandardMaterial
    anisotropic3: THREE.MeshStandardMaterial
    lambert21: THREE.MeshStandardMaterial
    lambert4: THREE.MeshStandardMaterial
    lambert19: THREE.MeshStandardMaterial
    lambert18: THREE.MeshStandardMaterial
    lambert17: THREE.MeshStandardMaterial
    lambert16: THREE.MeshStandardMaterial
  }
}

export function PringlesLogo(props: React.ComponentPropsWithoutRef<'group'>) {
  const { nodes, materials } = useGLTF('/pringles.glb') as unknown as GLTFResult
  const groupRef = useRef<THREE.Group>(null!)

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[1.6, -1.589, 3.826]} scale={[1.192, 1.342, 1.336]}>
        <mesh geometry={nodes.polySurface1_lambert9_0.geometry} material={materials.lambert9} />
        <mesh geometry={nodes.polySurface1_lambert20_0.geometry} material={materials.lambert20} />
        <mesh geometry={nodes.polySurface1_anisotropic5_0.geometry} material={materials.anisotropic5} />
      </group>
      <group position={[2.638, -3.432, 3.85]} rotation={[0, 0, 0.096]} scale={1.277}>
        <mesh geometry={nodes.polySurface48_anisotropic4_0.geometry} material={materials.anisotropic4} />
        <mesh geometry={nodes.polySurface49_anisotropic6_0.geometry} material={materials.anisotropic6} />
      </group>
      <group position={[-14.994, -12.031, 5.831]} rotation={[0.013, 0.009, 0.037]} scale={[1.218, 1.356, 1.424]}>
        <mesh geometry={nodes.polySurface27_lambert10_0.geometry} material={materials.lambert10} />
        <mesh geometry={nodes.polySurface27_lambert8_0.geometry} material={materials.lambert8} />
        <mesh geometry={nodes.polySurface27_lambert11_0.geometry} material={materials.lambert11} />
      </group>
      <group position={[-16.65, -8.065, 4.379]} scale={[1.039, 1.155, 1.155]}>
        <mesh geometry={nodes.polySurface41_anisotropic3_0.geometry} material={materials.anisotropic3} position={[0.508, -0.866, 0]} rotation={[0, 0, 0.028]} scale={[1, 1.03, 1]} />
        <mesh geometry={nodes.polySurface42_lambert21_0.geometry} material={materials.lambert21} />
        <mesh geometry={nodes.polySurface43_anisotropic3_0.geometry} material={materials.anisotropic3} position={[0, -0.013, 0]} />
        <mesh geometry={nodes.polySurface44_anisotropic3_0.geometry} material={materials.anisotropic3} position={[0, -0.013, 0]} />
        <mesh geometry={nodes.polySurface45_lambert4_0.geometry} material={materials.lambert4} position={[0, -0.013, 0]} />
        <mesh geometry={nodes.polySurface46_anisotropic3_0.geometry} material={materials.anisotropic3} />
        <mesh geometry={nodes.polySurface47_anisotropic3_0.geometry} material={materials.anisotropic3} position={[0.416, -0.365, 0]} rotation={[0, 0, 0.028]} />
      </group>
      <group position={[-15.416, -3.35, -0.363]}>
        <mesh geometry={nodes.polySurface30_lambert19_0.geometry} material={materials.lambert19} />
        <mesh geometry={nodes.polySurface31_lambert18_0.geometry} material={materials.lambert18} />
        <mesh geometry={nodes.polySurface32_lambert17_0.geometry} material={materials.lambert17} />
        <mesh geometry={nodes.polySurface33_lambert19_0.geometry} material={materials.lambert19} />
        <mesh geometry={nodes.polySurface34_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface35_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface36_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface37_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface38_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface39_lambert16_0.geometry} material={materials.lambert16} />
        <mesh geometry={nodes.polySurface40_lambert16_0.geometry} material={materials.lambert16} />
      </group>
      <mesh geometry={nodes.pDisc1_phong4_0.geometry} material={materials.phong4} position={[-0.068, 12.78, -0.524]} rotation={[-1.682, 1.421, 0.103]} scale={[0.499, 0.392, 0.334]} />
      <mesh geometry={nodes.pDisc3_phong4_0.geometry} material={materials.phong4} position={[2.626, 13.171, -0.572]} rotation={[-1.682, 1.421, 0.103]} scale={[0.41, 0.323, 0.275]} />
    </group>
  )
}

useGLTF.preload('/pringles.glb')
