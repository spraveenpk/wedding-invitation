"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FlagPoleProps {
  position: [number, number, number];
  color?: string;
  rotationY?: number;
}

function FestiveFlag({ position, color = "#d41468", rotationY = 0 }: FlagPoleProps) {
  const clothRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (clothRef.current) {
      // Fluttering wind effect
      clothRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 4 + position[2]) * 0.25;
      clothRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 3 + position[0]) * 0.08;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Bamboo / Wood Flag Pole */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 5, 8]} />
        <meshStandardMaterial color="#825134" roughness={0.8} />
      </mesh>

      {/* Golden Finial on top of pole */}
      <mesh position={[0, 5.08, 0]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color="#d49a43" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Triangular Streamer / Flag Cloth */}
      <mesh ref={clothRef} position={[0.6, 4.3, 0]}>
        <coneGeometry args={[0.65, 1.4, 3]} />
        <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Flags() {
  return (
    <group>
      {/* Festive flags along the pathway */}
      <FestiveFlag position={[-4.5, 0, 9]} color="#d41468" rotationY={Math.PI / 6} />
      <FestiveFlag position={[-4.5, 0, 3]} color="#e7b94c" rotationY={Math.PI / 6} />
      <FestiveFlag position={[-4.5, 0, -3]} color="#b72d3a" rotationY={Math.PI / 6} />
      <FestiveFlag position={[-4.5, 0, -9]} color="#d41468" rotationY={Math.PI / 6} />

      <FestiveFlag position={[4.5, 0, 9]} color="#e7b94c" rotationY={-Math.PI / 6} />
      <FestiveFlag position={[4.5, 0, 3]} color="#d41468" rotationY={-Math.PI / 6} />
      <FestiveFlag position={[4.5, 0, -3]} color="#b72d3a" rotationY={-Math.PI / 6} />
      <FestiveFlag position={[4.5, 0, -9]} color="#e7b94c" rotationY={-Math.PI / 6} />
    </group>
  );
}
