"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MandapDecor3D({ position = [0, 0, -18] }: { position?: [number, number, number] }) {
  const bell1Ref = useRef<THREE.Group>(null);
  const bell2Ref = useRef<THREE.Group>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bell1Ref.current) bell1Ref.current.rotation.z = Math.sin(t * 2) * 0.08;
    if (bell2Ref.current) bell2Ref.current.rotation.z = Math.cos(t * 2) * 0.08;
    if (flameLightRef.current) flameLightRef.current.intensity = 2.0 + Math.sin(t * 8) * 0.4;
  });

  return (
    <group position={position}>
      {/* Stone Mandapam Platform with Deep Wine Silk Carpet */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[11, 0.8, 8]} />
        <meshStandardMaterial color="#1a1412" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[10.2, 0.04, 7.2]} />
        <meshStandardMaterial color="#3a0d18" roughness={0.7} />
      </mesh>
      {/* Gold Carpet Border */}
      <mesh position={[0, 0.83, 0]}>
        <boxGeometry args={[9.8, 0.03, 6.8]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.84, 0]}>
        <boxGeometry args={[9.5, 0.03, 6.5]} />
        <meshStandardMaterial color="#24070f" roughness={0.8} />
      </mesh>

      {/* 4 Golden Fluted Mandap Pillars */}
      {[
        [-4.2, -2.6],
        [4.2, -2.6],
        [-4.2, 2.6],
        [4.2, 2.6],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 0.85, z]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <cylinderGeometry args={[0.26, 0.3, 3.4, 16]} />
            <meshStandardMaterial color="#e8d19a" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 4.1, 0]}>
            <boxGeometry args={[0.8, 0.3, 0.8]} />
            <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Canopy Architrave with Gold Cornice */}
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[11.5, 0.5, 8.5]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 5.6, 0]}>
        <boxGeometry args={[9.5, 0.4, 6.5]} />
        <meshStandardMaterial color="#24070f" roughness={0.6} />
      </mesh>

      {/* Hanging Brass Temple Bells */}
      <group ref={bell1Ref} position={[-2.5, 4.8, 3.8]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#c9a45c" metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <coneGeometry args={[0.18, 0.3, 16]} />
          <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      <group ref={bell2Ref} position={[2.5, 4.8, 3.8]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#c9a45c" metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <coneGeometry args={[0.18, 0.3, 16]} />
          <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Sacred Homa Fire Altar in Center */}
      <group position={[0, 0.85, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial color="#59321c" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.9, 0.1, 0.9]} />
          <meshStandardMaterial color="#c9a45c" metalness={0.7} />
        </mesh>
        {/* Flame */}
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.2, 0.45, 10]} />
          <meshBasicMaterial color="#ff8811" />
        </mesh>
        <pointLight ref={flameLightRef} position={[0, 0.5, 0]} color="#ff7700" intensity={2.0} distance={5} />
      </group>
    </group>
  );
}
