"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BananaTree({ position, flip = false }: { position: [number, number, number]; flip?: boolean }) {
  return (
    <group position={position} rotation={[0, flip ? -Math.PI / 4 : Math.PI / 4, 0]}>
      {/* Green Banana Tree Trunk */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 3.6, 12]} />
        <meshStandardMaterial color="#4a7c36" roughness={0.7} />
      </mesh>

      {/* Broad Arching Banana Leaves */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <group key={i} position={[0, 3.4, 0]} rotation={[0.4, angle, -0.3]}>
          <mesh position={[0, 0, 0.9]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.55, 0.04, 1.8]} />
            <meshStandardMaterial color="#357028" roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Hanging Banana Flower (Vazhaipoo) */}
      <mesh position={[0.2, 2.8, 0.3]}>
        <coneGeometry args={[0.12, 0.45, 8]} />
        <meshStandardMaterial color="#6b1d2f" roughness={0.6} />
      </mesh>
    </group>
  );
}

function HomaKundam({ position }: { position: [number, number, number] }) {
  const fireLightRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 12;
    const flicker = Math.sin(t) * 0.3 + Math.cos(t * 1.7) * 0.2;
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 2.0 + flicker;
    }
    if (flameMeshRef.current) {
      flameMeshRef.current.scale.set(1 + flicker * 0.2, 1 + flicker * 0.4, 1 + flicker * 0.2);
    }
  });

  return (
    <group position={position}>
      {/* Copper / Terracotta Stepped Fire Altar */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.4, 0.2, 1.4]} />
        <meshStandardMaterial color="#b35427" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.1, 0.15, 1.1]} />
        <meshStandardMaterial color="#8c3e19" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Sacred Wood Logs */}
      <mesh position={[0, 0.36, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.7]} />
        <meshStandardMaterial color="#3d1d11" roughness={0.9} />
      </mesh>
      {/* Sacred Agni / Fire Flame */}
      <mesh ref={flameMeshRef} position={[0, 0.55, 0]}>
        <coneGeometry args={[0.25, 0.55, 10]} />
        <meshBasicMaterial color="#ff8811" />
      </mesh>
      {/* Warm Fire Glow */}
      <pointLight
        ref={fireLightRef}
        position={[0, 0.6, 0]}
        color="#ff7700"
        intensity={2.2}
        distance={5}
        decay={2}
      />
    </group>
  );
}

export default function Mandap({ position = [0, 0, -20] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main Mandap Platform / Stage */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[12, 1.2, 8]} />
        <meshStandardMaterial color="#f5e1b8" roughness={0.6} />
      </mesh>

      {/* Royal Red & Gold Wedding Carpet */}
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[11.2, 0.04, 7.2]} />
        <meshStandardMaterial color="#b72d3a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.23, 0]}>
        <boxGeometry args={[10.6, 0.04, 6.6]} />
        <meshStandardMaterial color="#d49a43" metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.24, 0]}>
        <boxGeometry args={[10.2, 0.04, 6.2]} />
        <meshStandardMaterial color="#8a1824" roughness={0.8} />
      </mesh>

      {/* 4 Ornate Golden Pillars with Pedestals & Capitals */}
      {[
        [-4.5, -2.6],
        [4.5, -2.6],
        [-4.5, 2.6],
        [4.5, 2.6],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 1.25, z]}>
          {/* Pillar Pedestal Base */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.9, 0.6, 0.9]} />
            <meshStandardMaterial color="#d49a43" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Fluted Column Shaft */}
          <mesh position={[0, 2.3, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 3.4, 16]} />
            <meshStandardMaterial color="#e5b044" metalness={0.75} roughness={0.25} />
          </mesh>
          {/* Capital Crown */}
          <mesh position={[0, 4.1, 0]}>
            <boxGeometry args={[0.85, 0.3, 0.85]} />
            <meshStandardMaterial color="#d49a43" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Auspicious Banana Trees at Front Entrance */}
      <BananaTree position={[-5.3, 1.2, 3.2]} />
      <BananaTree position={[5.3, 1.2, 3.2]} flip />

      {/* Ornate Canopy Roof / Architrave */}
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[12.5, 0.6, 8.5]} />
        <meshStandardMaterial color="#d49a43" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tiered Upper Roof */}
      <mesh position={[0, 6.0, 0]}>
        <boxGeometry args={[10.5, 0.5, 6.5]} />
        <meshStandardMaterial color="#b72d3a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 6.4, 0]}>
        <boxGeometry args={[8.5, 0.4, 4.5]} />
        <meshStandardMaterial color="#e5b044" metalness={0.8} />
      </mesh>

      {/* Marigold & Mango Leaf Thoranam (Garland Garland Festoons) */}
      <mesh position={[0, 5.05, 3.75]}>
        <boxGeometry args={[9.5, 0.25, 0.08]} />
        <meshStandardMaterial color="#ff9900" roughness={0.8} />
      </mesh>
      <mesh position={[0, 4.88, 3.75]}>
        <boxGeometry args={[9.5, 0.12, 0.06]} />
        <meshStandardMaterial color="#357028" roughness={0.7} />
      </mesh>

      {/* Royal Wedding Backdrop */}
      <mesh position={[0, 3.2, -3.2]}>
        <boxGeometry args={[8, 3.6, 0.2]} />
        <meshStandardMaterial color="#fff6e5" roughness={0.6} />
      </mesh>
      {/* Golden Frame Border on Backdrop */}
      <mesh position={[0, 3.2, -3.08]}>
        <boxGeometry args={[7.6, 3.2, 0.05]} />
        <meshStandardMaterial color="#d49a43" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.2, -3.03]}>
        <boxGeometry args={[7.2, 2.8, 0.05]} />
        <meshStandardMaterial color="#b72d3a" roughness={0.7} />
      </mesh>

      {/* Sacred Homa Kundam Fire in Center */}
      <HomaKundam position={[0, 1.25, 0.2]} />
    </group>
  );
}
