"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LaserGrid() {
  const roadRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Scrolling effect feel
    if (roadRef.current) {
      // Subtle pulse
    }
  });

  return (
    <group>
      {/* Deep Obsidian Space Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial color="#02040a" />
      </mesh>

      {/* Cyber Neon Energy Runway */}
      <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[9, 80]} />
        <meshStandardMaterial color="#050a18" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Center Neon Cyan Light Track */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.3, 80]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Left Neon Laser Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.5, 0.02, 0]}>
        <planeGeometry args={[0.2, 80]} />
        <meshBasicMaterial color="#b026ff" />
      </mesh>

      {/* Right Neon Laser Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.5, 0.02, 0]}>
        <planeGeometry args={[0.2, 80]} />
        <meshBasicMaterial color="#b026ff" />
      </mesh>

      {/* Futuristic Energy Pylons lining the runway */}
      {[-30, -20, -10, 0, 10, 20].map((z, i) => (
        <group key={i}>
          {/* Left Pylon */}
          <group position={[-5.8, 0, z]}>
            <mesh position={[0, 1.8, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 3.6, 8]} />
              <meshStandardMaterial color="#1a1d2e" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Glowing Cyan Beacon Top */}
            <mesh position={[0, 3.7, 0]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            <pointLight position={[0, 3.7, 0]} color="#00f0ff" intensity={1.5} distance={5} />
          </group>

          {/* Right Pylon */}
          <group position={[5.8, 0, z]}>
            <mesh position={[0, 1.8, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 3.6, 8]} />
              <meshStandardMaterial color="#1a1d2e" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Glowing Magenta Beacon Top */}
            <mesh position={[0, 3.7, 0]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshBasicMaterial color="#ff007f" />
            </mesh>
            <pointLight position={[0, 3.7, 0]} color="#ff007f" intensity={1.5} distance={5} />
          </group>
        </group>
      ))}
    </group>
  );
}
