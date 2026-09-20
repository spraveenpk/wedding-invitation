"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Petal {
  x: number;
  y: number;
  z: number;
  speed: number;
  rotX: number;
  rotY: number;
  rotSpeed: number;
  scale: number;
  isJasmine: boolean;
}

export default function Flowers({ count = 100 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 14 + 1,
      z: (Math.random() - 0.5) * 40 - 4,
      speed: Math.random() * 0.7 + 0.35,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 2.5,
      scale: Math.random() * 0.12 + 0.08,
      isJasmine: i % 2 === 0, // Alternates rose and jasmine petals
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const p = petals[i];
      if (!p) continue;

      child.position.y -= p.speed * delta;
      child.rotation.x += p.rotSpeed * delta;
      child.rotation.y += p.rotSpeed * 0.8 * delta;
      child.position.x += Math.sin(child.position.y * 1.8 + p.x) * 0.25 * delta;

      // Recycle to top
      if (child.position.y < -0.4) {
        child.position.y = 14;
        child.position.x = (Math.random() - 0.5) * 20;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {petals.map((p, idx) => (
        <mesh
          key={idx}
          position={[p.x, p.y, p.z]}
          scale={[p.scale, p.scale * 0.25, p.scale * 1.3]}
          rotation={[p.rotX, p.rotY, 0]}
        >
          <sphereGeometry args={[1, 7, 7]} />
          {p.isJasmine ? (
            /* Creamy White Fragrant Jasmine Petal */
            <meshStandardMaterial color="#fffef7" roughness={0.5} />
          ) : (
            /* Royal Deep Crimson Rose Petal */
            <meshStandardMaterial color="#8a0f24" roughness={0.4} />
          )}
        </mesh>
      ))}
    </group>
  );
}
