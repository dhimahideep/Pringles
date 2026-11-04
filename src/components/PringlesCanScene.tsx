'use client'

import React, { forwardRef } from 'react'
import * as THREE from 'three'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    red_Blue_0: THREE.Mesh
    red_metal_0: THREE.Mesh
    Cover007_cover_0: THREE.Mesh
    Cover_log006_Material_0: THREE.Mesh
    green_Blue_0: THREE.Mesh
    green_metal_0: THREE.Mesh
    Cover008_cover_0: THREE.Mesh
    Cover_log007_Material_0: THREE.Mesh
    orange_Blue_0: THREE.Mesh
    orange_metal_0: THREE.Mesh
    Cover011_cover_0: THREE.Mesh
    Cover_log010_Material_0: THREE.Mesh
  }
  materials: {
    Blue: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
    cover: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
  }
}

type Props = {
  activeFlavor?: number
  canScale?: number
} & React.ComponentPropsWithoutRef<'group'>

export const PringlesCanScene = forwardRef<THREE.Group, Props>(
  function PringlesCanScene({ activeFlavor = 0, canScale = 0.58, ...props }, ref) {
    const { nodes, materials } = useGLTF('/pringles_cans.glb') as unknown as GLTFResult

    return (
      <group ref={ref} {...props} dispose={null}>
        <Center>
          {/* Responsive scale: 0.58 on desktop, ~0.36 - 0.40 on mobile */}
          <group scale={canScale}>
            {/* rotation={[-Math.PI / 2, 0, 0]} aligns upright with front label facing camera directly */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
              {/* ── 1. RED CAN (ORIGINAL): Visible only when activeFlavor === 0 ── */}
              <group visible={activeFlavor === 0}>
                {/* Sleeve Body with full GLTF texture map */}
                <mesh
                  geometry={nodes.red_Blue_0.geometry}
                  material={materials.Blue}
                  castShadow
                  receiveShadow
                />
                {/* Bottom Metal Rim */}
                <mesh
                  geometry={nodes.red_metal_0.geometry}
                  material={materials.metal}
                  castShadow
                  receiveShadow
                />
                {/* Lid */}
                <group position={[0, 0, 1.535]}>
                  <mesh
                    geometry={nodes.Cover007_cover_0.geometry}
                    material={materials.cover}
                    scale={[0.462, 0.462, 1.722]}
                    castShadow
                  />
                  <mesh
                    geometry={nodes.Cover_log006_Material_0.geometry}
                    material={materials.Material}
                    position={[0, 0, -0.022]}
                    scale={[0.469, 0.469, 1.722]}
                  />
                </group>
              </group>

              {/* ── 2. GREEN CAN (SOUR CREAM): Visible only when activeFlavor === 1 ── */}
              <group visible={activeFlavor === 1}>
                {/* Sleeve Body with full GLTF texture map */}
                <mesh
                  geometry={nodes.green_Blue_0.geometry}
                  material={materials.Blue}
                  castShadow
                  receiveShadow
                />
                {/* Bottom Metal Rim */}
                <mesh
                  geometry={nodes.green_metal_0.geometry}
                  material={materials.metal}
                  castShadow
                  receiveShadow
                />
                {/* Lid */}
                <group position={[0, 0, 1.535]}>
                  <mesh
                    geometry={nodes.Cover008_cover_0.geometry}
                    material={materials.cover}
                    scale={[0.462, 0.462, 1.722]}
                    castShadow
                  />
                  <mesh
                    geometry={nodes.Cover_log007_Material_0.geometry}
                    material={materials.Material}
                    position={[0, 0, -0.022]}
                    scale={[0.469, 0.469, 1.722]}
                  />
                </group>
              </group>

              {/* ── 3. YELLOW CAN (CHEDDAR): Visible only when activeFlavor === 2 ── */}
              <group visible={activeFlavor === 2}>
                {/* Sleeve Body with full GLTF texture map */}
                <mesh
                  geometry={nodes.orange_Blue_0.geometry}
                  material={materials.Blue}
                  castShadow
                  receiveShadow
                />
                {/* Bottom Metal Rim */}
                <mesh
                  geometry={nodes.orange_metal_0.geometry}
                  material={materials.metal}
                  castShadow
                  receiveShadow
                />
                {/* Lid */}
                <group position={[0, 0, 1.535]}>
                  <mesh
                    geometry={nodes.Cover011_cover_0.geometry}
                    material={materials.cover}
                    scale={[0.462, 0.462, 1.722]}
                    castShadow
                  />
                  <mesh
                    geometry={nodes.Cover_log010_Material_0.geometry}
                    material={materials.Material}
                    position={[0, 0, -0.022]}
                    scale={[0.469, 0.469, 1.722]}
                  />
                </group>
              </group>
            </group>
          </group>
        </Center>
      </group>
    )
  }
)

useGLTF.preload('/pringles_cans.glb')
