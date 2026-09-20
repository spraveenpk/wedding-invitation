"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LampProps {
  position: [number, number, number];
}

function Kuthuvilakku({ position }: LampProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Flickering candle/oil flame effect
    const t = state.clock.getElapsedTime() * 10 + position[0] * 3;
    const flicker = Math.sin(t) * 0.15 + Math.cos(t * 2.3) * 0.1;

    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + flicker;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + flicker * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Heavy Circular Brass Base / Aadanam */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.16, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Slender Central Stem */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.4, 12]} />
        <meshStandardMaterial color="#d49a43" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Middle Decorative Ring / Thangali */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.12, 0.03, 8, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Oil Basin / Thattu (Bowl holding the oil) */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.1, 0.14, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Top Finial / Annam (Peacock / Sacred Bird Crest) */}
      <mesh position={[0, 1.72, 0]}>
        <coneGeometry args={[0.08, 0.28, 8]} />
        <meshStandardMaterial color="#d49a43" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glowing Golden Flame Mesh */}
      <mesh ref={flameRef} position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#ffaa33" />
      </mesh>

      {/* Dynamic Warm Flame Light Source */}
      <pointLight
        ref={lightRef}
        position={[0, 1.75, 0]}
        color="#ff9922"
        intensity={1.8}
        distance={6}
        decay={2}
      />
    </group>
  );
}

export default function Lamps() {
  return (
    <group>
      {/* Traditional Kuthuvilakku lamps flanking the procession path */}
      <Kuthuvilakku position={[-3.6, 0, 11]} />
      <Kuthuvilakku position={[-3.6, 0, 5]} />
      <Kuthuvilakku position={[-3.6, 0, -1]} />
      <Kuthuvilakku position={[-3.6, 0, -7]} />
      <Kuthuvilakku position={[-3.6, 0, -13]} />

      <Kuthuvilakku position={[3.6, 0, 11]} />
      <Kuthuvilakku position={[3.6, 0, 5]} />
      <Kuthuvilakku position={[3.6, 0, -1]} />
      <Kuthuvilakku position={[3.6, 0, -7]} />
      <Kuthuvilakku position={[3.6, 0, -13]} />
    </group>
  );
}
