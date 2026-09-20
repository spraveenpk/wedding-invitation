"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GroomProps {
  position?: [number, number, number];
}

export default function Groom({ position = [0, 0, 8] }: GroomProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Move along Z toward mandap
    groupRef.current.position.z -= delta * 1.5;
    if (groupRef.current.position.z < -16) {
      groupRef.current.position.z = 10;
    }

    const t = state.clock.getElapsedTime() * 7;
    // Walking bobbing
    groupRef.current.position.y = (position[1] || 0) + Math.abs(Math.sin(t)) * 0.12;

    // Limb swing
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t) * 0.35;
      rightLegRef.current.rotation.x = -Math.sin(t) * 0.35;
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -Math.sin(t) * 0.3;
      rightArmRef.current.rotation.x = Math.sin(t) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Turban / Thalaipaagai */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.35, 16]} />
        <meshStandardMaterial color="#c99b4d" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Turban Top Dome */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#d49a43" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Turban Brooch / Kalgi Gem */}
      <mesh position={[0, 2.45, 0.42]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#b72d3a" emissive="#550011" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#8b5a3c" roughness={0.7} />
      </mesh>
      {/* Mustache / Smile detail */}
      <mesh position={[0, 1.76, 0.33]}>
        <boxGeometry args={[0.22, 0.05, 0.05]} />
        <meshStandardMaterial color="#221105" />
      </mesh>

      {/* Golden Silk Kurta / Torso */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.38, 0.45, 0.95, 16]} />
        <meshStandardMaterial color="#f5e2b3" roughness={0.5} />
      </mesh>

      {/* Angavastram / Golden Shawl draped over shoulder */}
      <mesh position={[-0.12, 1.25, 0.1]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.2, 1.0, 0.38]} />
        <meshStandardMaterial color="#d49a43" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.48, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#f5e2b3" />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.48, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#f5e2b3" />
      </mesh>

      {/* Veshti / Dhoti Waist & Golden Zari Border */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.42, 0.43, 0.15, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.6} />
      </mesh>

      {/* Left Leg in White/Cream Silk Veshti */}
      <mesh ref={leftLegRef} position={[-0.2, 0.25, 0]}>
        <cylinderGeometry args={[0.14, 0.13, 0.85, 12]} />
        <meshStandardMaterial color="#fffcf4" roughness={0.8} />
      </mesh>

      {/* Right Leg in White/Cream Silk Veshti */}
      <mesh ref={rightLegRef} position={[0.2, 0.25, 0]}>
        <cylinderGeometry args={[0.14, 0.13, 0.85, 12]} />
        <meshStandardMaterial color="#fffcf4" roughness={0.8} />
      </mesh>

      {/* Golden Zari Border on Veshti */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.7} />
      </mesh>
    </group>
  );
}
