"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpParticles({ count = 120 }: { count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 35,
      y: Math.random() * 18 + 0.5,
      z: (Math.random() - 0.5) * 60,
      speed: Math.random() * 8 + 4,
      length: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.4 ? "#00f0ff" : Math.random() > 0.5 ? "#b026ff" : "#ffd000",
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const p = particles[i];
      if (!p) continue;

      child.position.z += p.speed * delta;
      if (child.position.z > 25) {
        child.position.z = -35;
        child.position.x = (Math.random() - 0.5) * 35;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]}>
          <boxGeometry args={[0.04, 0.04, p.length]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}
