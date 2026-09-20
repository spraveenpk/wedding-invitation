"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingCard3DProps {
  progress: number; // 0 to 1
}

export default function FloatingCard3D({ progress }: FloatingCard3DProps) {
  const cardGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cardGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Active range: 0.38 to 0.58
    if (progress >= 0.38 && progress <= 0.58) {
      // Relative progress within card section (0 to 1)
      const localP = (progress - 0.38) / 0.20;

      // Visibility curve (fades in, peaks at 0.5, fades out)
      const scaleCurve = Math.sin(localP * Math.PI);
      const targetScale = Math.max(0.001, scaleCurve * 1.0);
      cardGroupRef.current.scale.set(targetScale, targetScale, targetScale);

      // Rotation curve: rotates gracefully into face-on angle and then slightly tilts away
      const targetRotY = (1 - localP) * 0.8 - 0.4;
      const targetRotX = Math.sin(t * 1.2) * 0.04;
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(cardGroupRef.current.rotation.y, targetRotY, 0.1);
      cardGroupRef.current.rotation.x = targetRotX;

      // Gentle floating bob
      cardGroupRef.current.position.y = 2.8 + Math.sin(t * 1.8) * 0.08;
      cardGroupRef.current.position.z = -2;
      cardGroupRef.current.visible = true;
    } else {
      cardGroupRef.current.visible = false;
    }
  });

  return (
    <group ref={cardGroupRef} position={[0, 2.8, -2]} visible={false}>
      {/* 3D Physical Card Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 4.4, 0.08]} />
        <meshStandardMaterial color="#1a060b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Gold Beveled Edge / Rim */}
      <mesh position={[0, 0, 0.042]}>
        <boxGeometry args={[3.1, 4.3, 0.01]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Inner Deep Wine Velvet Inset */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.95, 4.15, 0.01]} />
        <meshStandardMaterial color="#24070f" roughness={0.7} />
      </mesh>

      {/* Gold Inner Filigree Border Line */}
      <mesh position={[0, 0, 0.058]}>
        <boxGeometry args={[2.75, 3.95, 0.005]} />
        <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <boxGeometry args={[2.7, 3.9, 0.005]} />
        <meshStandardMaterial color="#24070f" roughness={0.7} />
      </mesh>

      {/* Embossed Gold Monogram Medallion on Card */}
      <mesh position={[0, 1.2, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.02, 32]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0.085]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#e8d19a" metalness={0.95} />
      </mesh>

      {/* Card Spotlight for Dramatic Luxury Sheen */}
      <pointLight position={[0, 2.5, 1.8]} color="#e8d19a" intensity={2.5} distance={5} />
    </group>
  );
}
