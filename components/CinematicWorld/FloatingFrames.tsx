"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingFramesProps {
  progress: number;
}

function Frame({
  position,
  rotationY,
  scale = 1,
}: {
  position: [number, number, number];
  rotationY: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating bob
    meshRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.12;
    meshRef.current.rotation.y = rotationY + Math.cos(t * 1.1 + position[2]) * 0.05;
  });

  return (
    <group ref={meshRef} position={position} scale={[scale, scale, scale]}>
      {/* Outer Antique Gold Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 2.4, 0.06]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Inner Bevel Border */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.65, 2.25, 0.04]} />
        <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Dark Silk Velvet Photo Inset */}
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[1.5, 2.1, 0.02]} />
        <meshStandardMaterial color="#1a0a10" roughness={0.8} />
      </mesh>
      {/* Decorative Couple Silhouette Emblem */}
      <mesh position={[0, 0.2, 0.05]}>
        <circleGeometry args={[0.45, 32]} />
        <meshBasicMaterial color="#24070f" />
      </mesh>
      <mesh position={[0, 0.2, 0.055]}>
        <ringGeometry args={[0.42, 0.45, 32]} />
        <meshBasicMaterial color="#c9a45c" />
      </mesh>
      {/* Gold Lotus Leaf in Frame */}
      <mesh position={[0, -0.6, 0.05]}>
        <boxGeometry args={[0.8, 0.02, 0.01]} />
        <meshBasicMaterial color="#e8d19a" />
      </mesh>
    </group>
  );
}

export default function FloatingFrames({ progress }: FloatingFramesProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Visible in the 0.15 - 0.38 zone
    if (progress >= 0.14 && progress <= 0.38) {
      const p = (progress - 0.14) / 0.24;
      const opacity = Math.sin(p * Math.PI);
      groupRef.current.scale.set(opacity, opacity, opacity);
      groupRef.current.visible = true;
    } else {
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <Frame position={[-2.8, 3.2, 3]} rotationY={0.35} scale={1.1} />
      <Frame position={[2.8, 2.8, 2]} rotationY={-0.35} scale={1.05} />
      <Frame position={[-2.5, 2.2, -1]} rotationY={0.25} scale={0.95} />
      <Frame position={[2.6, 3.5, -2]} rotationY={-0.28} scale={1.0} />
    </group>
  );
}
