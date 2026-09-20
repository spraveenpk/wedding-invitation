"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoverSpeeder({ position = [0, 1.2, 8] }: { position?: [number, number, number] }) {
  const speederRef = useRef<THREE.Group>(null);
  const leftEngineLight = useRef<THREE.PointLight>(null);
  const rightEngineLight = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!speederRef.current) return;

    // Speeder moves along highway toward the Cyber-Mandap
    speederRef.current.position.z -= delta * 3.0;
    if (speederRef.current.position.z < -17) {
      speederRef.current.position.z = 14;
    }

    const t = state.clock.getElapsedTime();
    // Anti-gravity hover floating motion
    speederRef.current.position.y = 1.2 + Math.sin(t * 4) * 0.15;
    speederRef.current.rotation.z = Math.sin(t * 2) * 0.05; // slight banking

    // Engine flicker
    if (leftEngineLight.current && rightEngineLight.current) {
      const flicker = 2.5 + Math.sin(t * 15) * 0.8;
      leftEngineLight.current.intensity = flicker;
      rightEngineLight.current.intensity = flicker;
    }
  });

  return (
    <group ref={speederRef} position={position}>
      {/* Aerodynamic Mecha Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.4, 3.4]} />
        <meshStandardMaterial color="#0c1224" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Sleek Cockpit Canopy (Neon Cyan Glass) */}
      <mesh position={[0, 0.35, 0.2]}>
        <boxGeometry args={[1.0, 0.45, 1.8]} />
        <meshPhysicalMaterial color="#00f0ff" transmission={0.7} opacity={0.8} transparent roughness={0.1} />
      </mesh>

      {/* Futuristic Pilot / Cyber Groom Avatar Inside */}
      <group position={[0, 0.4, 0.2]}>
        {/* Helmet with Cyber Gold Visor */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.3, 14, 14]} />
          <meshStandardMaterial color="#1a2238" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0.2]}>
          <boxGeometry args={[0.35, 0.15, 0.1]} />
          <meshBasicMaterial color="#ffd000" />
        </mesh>
        {/* Cyber Suit Torso */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.4]} />
          <meshStandardMaterial color="#050a18" metalness={0.8} />
        </mesh>
      </group>

      {/* Aerodynamic Forward Wings / Front Plasma Blades */}
      <mesh position={[-1.0, -0.05, 0.8]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.7, 0.1, 1.8]} />
        <meshStandardMaterial color="#1a2238" metalness={0.9} />
      </mesh>
      <mesh position={[1.0, -0.05, 0.8]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.7, 0.1, 1.8]} />
        <meshStandardMaterial color="#1a2238" metalness={0.9} />
      </mesh>

      {/* Neon Plasma Trim on Wings */}
      <mesh position={[-1.35, -0.05, 0.8]}>
        <boxGeometry args={[0.08, 0.08, 1.6]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[1.35, -0.05, 0.8]}>
        <boxGeometry args={[0.08, 0.08, 1.6]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Twin Ion Thruster Nozzles */}
      <mesh position={[-0.55, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#2d3752" metalness={0.9} />
      </mesh>
      <mesh position={[0.55, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#2d3752" metalness={0.9} />
      </mesh>

      {/* Glowing Twin Cyan Plasma Engine Flames */}
      <mesh position={[-0.55, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.22, 0.8, 12]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0.55, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.22, 0.8, 12]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Thruster Lights */}
      <pointLight ref={leftEngineLight} position={[-0.55, 0, 2.2]} color="#00f0ff" intensity={2.5} distance={5} />
      <pointLight ref={rightEngineLight} position={[0.55, 0, 2.2]} color="#00f0ff" intensity={2.5} distance={5} />
    </group>
  );
}
