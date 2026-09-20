"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Lamp({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 10 + position[0] * 2;
    const flicker = Math.sin(t) * 0.15 + Math.cos(t * 2.3) * 0.1;

    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + flicker;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + flicker * 0.35;
    }
  });

  return (
    <group position={position}>
      {/* Heavy Circular Brass Base */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.3, 0.38, 0.16, 16]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Slender Shaft */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.3, 12]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Oil Basin */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.28, 0.1, 0.12, 16]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Sacred Bird / Top Finial */}
      <mesh position={[0, 1.65, 0]}>
        <coneGeometry args={[0.07, 0.25, 8]} />
        <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Glowing Flame */}
      <mesh ref={flameRef} position={[0, 1.58, 0]}>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial color="#ffaa33" />
      </mesh>
      {/* Warm Point Light */}
      <pointLight ref={lightRef} position={[0, 1.65, 0]} color="#ff9922" intensity={1.6} distance={5} />
    </group>
  );
}

export default function Kuthuvilakku3D() {
  return (
    <group>
      {/* Entrance Lamps */}
      <Lamp position={[-3.8, 0, 11]} />
      <Lamp position={[3.8, 0, 11]} />

      {/* Corridor Lamps */}
      <Lamp position={[-3.2, 0, 6]} />
      <Lamp position={[3.2, 0, 6]} />

      <Lamp position={[-3.2, 0, 0]} />
      <Lamp position={[3.2, 0, 0]} />

      <Lamp position={[-3.2, 0, -6]} />
      <Lamp position={[3.2, 0, -6]} />

      <Lamp position={[-3.2, 0, -12]} />
      <Lamp position={[3.2, 0, -12]} />
    </group>
  );
}
