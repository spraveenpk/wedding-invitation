"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TempleProps {
  position?: [number, number, number];
  onBellClick?: () => void;
}

export default function Temple({ position = [-13, 0, -6], onBellClick }: TempleProps) {
  const bellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bellRef.current) {
      // Subtle ambient bell swing
      bellRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;
    }
  });

  return (
    <group position={position} rotation={[0, Math.PI / 4, 0]}>
      {/* Stone Foundation / Platform */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[8, 1, 8]} />
        <meshStandardMaterial color="#8a7968" roughness={0.9} />
      </mesh>

      {/* Main Temple Sanctum Base */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[6.5, 3, 6.5]} />
        <meshStandardMaterial color="#c2845c" roughness={0.7} />
      </mesh>

      {/* Temple Entrance Doorway (Darkened Portal) */}
      <mesh position={[0, 2, 3.28]}>
        <boxGeometry args={[2, 2.4, 0.1]} />
        <meshStandardMaterial color="#2d1d17" />
      </mesh>

      {/* Hanging Brass Temple Bell (Interactive / Easter Egg) */}
      <group
        ref={bellRef}
        position={[0, 3.1, 3.3]}
        onClick={(e) => {
          e.stopPropagation();
          if (onBellClick) onBellClick();
        }}
      >
        {/* Bell Cord */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#d49a43" metalness={0.8} />
        </mesh>
        {/* Bell Body */}
        <mesh position={[0, -0.1, 0]}>
          <coneGeometry args={[0.22, 0.35, 16]} />
          <meshStandardMaterial color="#d49a43" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Bell Clapper */}
        <mesh position={[0, -0.28, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#d49a43" metalness={0.9} />
        </mesh>
      </group>

      {/* Gopuram Tier 1 */}
      <mesh position={[0, 4.6, 0]}>
        <boxGeometry args={[5.2, 1.4, 5.2]} />
        <meshStandardMaterial color="#ba6b49" roughness={0.6} />
      </mesh>

      {/* Gopuram Tier 2 */}
      <mesh position={[0, 5.8, 0]}>
        <boxGeometry args={[4.2, 1.2, 4.2]} />
        <meshStandardMaterial color="#c2845c" roughness={0.6} />
      </mesh>

      {/* Gopuram Tier 3 */}
      <mesh position={[0, 6.8, 0]}>
        <boxGeometry args={[3.2, 1.0, 3.2]} />
        <meshStandardMaterial color="#ba6b49" roughness={0.6} />
      </mesh>

      {/* Gopuram Crown / Barrel Vault Roof */}
      <mesh position={[0, 7.6, 0]}>
        <boxGeometry args={[2.5, 0.7, 1.8]} />
        <meshStandardMaterial color="#a94d3f" roughness={0.5} />
      </mesh>

      {/* Golden Kalasam (Sacred Finials) on Top */}
      {[-0.6, 0, 0.6].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 8.1, 0]}>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.16, 0.45, 12]} />
            <meshStandardMaterial color="#e5b044" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#ffd56b" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
