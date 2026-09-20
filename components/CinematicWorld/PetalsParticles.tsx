"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleData {
  origX: number;
  origY: number;
  origZ: number;
  speed: number;
  rotSpeed: number;
  scale: number;
  isJasmine: boolean;
  isGoldDust: boolean;
}

export default function PetalsParticles({ count = 110, progress = 0 }: { count?: number; progress?: number }) {
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      origX: (Math.random() - 0.5) * 16,
      origY: Math.random() * 12 + 0.5,
      origZ: (Math.random() - 0.5) * 36,
      speed: Math.random() * 0.6 + 0.3,
      rotSpeed: (Math.random() - 0.5) * 2,
      scale: Math.random() * 0.12 + 0.06,
      isJasmine: i % 3 === 0,
      isGoldDust: i % 3 === 1,
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;

    // Check if in ending convergence zone (> 0.95)
    const isEnding = progress > 0.95;
    const convergeFactor = isEnding ? Math.min(1, (progress - 0.95) / 0.04) : 0;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const p = particles[i];
      if (!p) continue;

      if (convergeFactor > 0.1) {
        // Converge particles toward center [0, 2.5, -2]
        child.position.x = THREE.MathUtils.lerp(child.position.x, 0, convergeFactor * 0.08);
        child.position.y = THREE.MathUtils.lerp(child.position.y, 2.5, convergeFactor * 0.08);
        child.position.z = THREE.MathUtils.lerp(child.position.z, -2, convergeFactor * 0.08);
        child.rotation.y += delta * 3;
      } else {
        // Normal gentle drifting
        child.position.y -= p.speed * delta;
        child.rotation.x += p.rotSpeed * delta;
        child.rotation.y += p.rotSpeed * 0.8 * delta;
        child.position.x += Math.sin(child.position.y * 1.5 + p.origX) * 0.2 * delta;

        // Recycle to top
        if (child.position.y < -0.4) {
          child.position.y = 12;
          child.position.x = (Math.random() - 0.5) * 16;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh
          key={idx}
          position={[p.origX, p.origY, p.origZ]}
          scale={[p.scale, p.scale * 0.3, p.scale * 1.2]}
        >
          <sphereGeometry args={[1, 6, 6]} />
          {p.isGoldDust ? (
            <meshBasicMaterial color="#e8d19a" />
          ) : p.isJasmine ? (
            <meshStandardMaterial color="#f7f0e2" roughness={0.4} />
          ) : (
            <meshStandardMaterial color="#3a0d18" roughness={0.5} />
          )}
        </mesh>
      ))}
    </group>
  );
}
