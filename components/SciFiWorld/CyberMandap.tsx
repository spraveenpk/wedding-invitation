"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CyberMandap({ position = [0, 0, -22] }: { position?: [number, number, number] }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Counter-rotating quantum rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.6;
      outerRingRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -= delta * 0.9;
      middleRingRef.current.rotation.y = Math.cos(t * 0.8) * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 1.2;
    }

    // Core pulsing energy
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 6) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.5 + Math.sin(t * 8) * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Heavy Hexagonal Cyber Platform Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[7, 8, 0.8, 6]} />
        <meshStandardMaterial color="#0b1021" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Glowing Neon Cyber Hex Edges */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[6.7, 6.7, 0.05, 6]} />
        <meshStandardMaterial color="#050a18" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Neon Platform Border Inset */}
      <mesh position={[0, 0.86, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.8, 0.08, 8, 6]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* 4 Futuristic Plasma Energy Pillars */}
      {[
        [-4, -3],
        [4, -3],
        [-4, 3],
        [4, 3],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 0.8, z]}>
          {/* Base Pedestal */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.9, 0.8, 0.9]} />
            <meshStandardMaterial color="#1a2035" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Plasma Pillar Shaft */}
          <mesh position={[0, 2.6, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 3.6, 12]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.4} roughness={0.1} emissive="#00a3ff" emissiveIntensity={0.6} />
          </mesh>
          {/* Pillar Capital Emitter */}
          <mesh position={[0, 4.6, 0]}>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial color="#1a2035" metalness={0.9} />
          </mesh>
          {/* Vertical Energy Beam Light */}
          <pointLight position={[0, 2.6, 0]} color="#00f0ff" intensity={2} distance={6} />
        </group>
      ))}

      {/* Floating Orbital Canopy Ring */}
      <mesh position={[0, 5.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.2, 0.25, 12, 32]} />
        <meshStandardMaterial color="#1a2035" metalness={0.9} />
      </mesh>
      <mesh position={[0, 5.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.0, 0.08, 8, 32]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>

      {/* Central Quantum Reactor Altar */}
      <group position={[0, 2.2, 0]}>
        {/* Outer Gyroscopic Quantum Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.0, 0.08, 12, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Middle Gyroscopic Quantum Ring */}
        <mesh ref={middleRingRef}>
          <torusGeometry args={[1.5, 0.06, 12, 32]} />
          <meshBasicMaterial color="#b026ff" />
        </mesh>

        {/* Inner Gyroscopic Quantum Ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.0, 0.05, 12, 32]} />
          <meshBasicMaterial color="#ffd000" />
        </mesh>

        {/* Pulsing Glowing Fusion Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* High-intensity Core Point Light */}
        <pointLight ref={coreLightRef} color="#00f0ff" intensity={4} distance={10} />
      </group>
    </group>
  );
}
