'use client'

import { Images } from '@/constants/images'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

interface Earth3DProps {
  size?: 'lg' | 'xl' | 'md' | 'sm' | 'xs'
  image?: string
  rotationSpeed?: number
}

const Globe = ({ image, rotationSpeed = 0.005 }: { image: string; rotationSpeed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, image)

  // Rotate the globe on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  )
}

export const Earth3D: React.FC<Earth3DProps> = (props) => {
  const { size = 'xl', image = Images.worldMap, rotationSpeed = 0.005 } = props

  const containerClass = {
    xs: 'h-20 w-20',
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-80 w-80',
    xl: 'h-96 w-96',
  }[size]

  return (
    <div className={`${containerClass} relative overflow-hidden rounded-full shadow-lg bg-black`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Globe image={image} rotationSpeed={rotationSpeed} />
      </Canvas>
    </div>
  )
}
