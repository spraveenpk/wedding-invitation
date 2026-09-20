"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GuestProps {
  position: [number, number, number];
  rotationY?: number;
  sareeColor?: string;
  isFemale?: boolean;
}

function GuestAvatar({ position, rotationY = 0, sareeColor = "#d41468", isFemale = true }: GuestProps) {
  const armRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (armRef.current) {
      // Gentle celebratory wave / namaste sway
      armRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 3 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.26, 14, 14]} />
        <meshStandardMaterial color="#825134" />
      </mesh>

      {/* Hair / Kondai (bun) for female, or hair for male */}
      {isFemale ? (
        <mesh position={[0, 1.7, -0.22]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#1a0e05" />
        </mesh>
      ) : (
        <mesh position={[0, 1.82, 0]}>
          <sphereGeometry args={[0.26, 12, 12]} />
          <meshStandardMaterial color="#1a0e05" />
        </mesh>
      )}

      {/* Torso / Saree Blouse or Kurta */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.26, 0.32, 0.7, 12]} />
        <meshStandardMaterial color={sareeColor} roughness={0.4} />
      </mesh>

      {/* Saree pleats / skirt or Dhoti */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.42, 0.9, 12]} />
        <meshStandardMaterial color={sareeColor} roughness={0.5} />
      </mesh>

      {/* Golden Zari Border on Saree / Dhoti */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.38, 0.03, 8, 16]} />
        <meshStandardMaterial color="#d49a43" metalness={0.7} />
      </mesh>

      {/* Greeting Arm */}
      <mesh ref={armRef} position={[0.3, 1.15, 0.15]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
        <meshStandardMaterial color="#825134" />
      </mesh>
    </group>
  );
}

export default function Guests() {
  return (
    <group>
      {/* Left side guest clusters */}
      <GuestAvatar position={[-3.2, 0, 8]} rotationY={Math.PI / 4} sareeColor="#d41468" isFemale={true} />
      <GuestAvatar position={[-4.0, 0, 7.2]} rotationY={Math.PI / 5} sareeColor="#f1ce72" isFemale={false} />
      <GuestAvatar position={[-3.4, 0, -2]} rotationY={Math.PI / 3} sareeColor="#b72d3a" isFemale={true} />
      <GuestAvatar position={[-4.2, 0, -3]} rotationY={Math.PI / 4} sareeColor="#e7b94c" isFemale={false} />
      <GuestAvatar position={[-3.2, 0, -9]} rotationY={Math.PI / 3} sareeColor="#a90b52" isFemale={true} />
      <GuestAvatar position={[-3.9, 0, -10]} rotationY={Math.PI / 4} sareeColor="#fffcf4" isFemale={false} />

      {/* Right side guest clusters */}
      <GuestAvatar position={[3.2, 0, 8]} rotationY={-Math.PI / 4} sareeColor="#f1ce72" isFemale={true} />
      <GuestAvatar position={[4.0, 0, 7.2]} rotationY={-Math.PI / 5} sareeColor="#d41468" isFemale={false} />
      <GuestAvatar position={[3.4, 0, -2]} rotationY={-Math.PI / 3} sareeColor="#a90b52" isFemale={true} />
      <GuestAvatar position={[4.2, 0, -3]} rotationY={-Math.PI / 4} sareeColor="#fffcf4" isFemale={false} />
      <GuestAvatar position={[3.2, 0, -9]} rotationY={-Math.PI / 3} sareeColor="#b72d3a" isFemale={true} />
      <GuestAvatar position={[3.9, 0, -10]} rotationY={-Math.PI / 4} sareeColor="#e7b94c" isFemale={false} />
    </group>
  );
}
