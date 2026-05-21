"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Shape({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapesScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <Shape position={[-2.2, 0.8, -1]} scale={0.35} color="#c4b5fd" speed={0.8} />
      <Shape position={[2.5, -0.4, -0.5]} scale={0.28} color="#818cf8" speed={1.1} />
      <Shape position={[0.5, 1.2, -1.5]} scale={0.22} color="#ddd6fe" speed={0.6} />
      <Shape position={[-1, -1, -0.8]} scale={0.18} color="#533afd" speed={1.3} />
    </>
  );
}
