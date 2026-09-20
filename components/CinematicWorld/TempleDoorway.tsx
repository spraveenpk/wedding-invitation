"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TempleDoorwayProps {
  doorProgress: number; // 0 (closed) to 1 (fully open)
}

export default function TempleDoorway({ doorProgress }: TempleDoorwayProps) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Target rotation: open outward up to ~85 degrees
    const targetAngle = doorProgress * (Math.PI * 0.48);

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetAngle,
        0.08
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetAngle,
        0.08
      );
    }
  });

  return (
    <group position={[0, 0, 10]}>
      {/* Stone Archway / Gateway Threshold */}
      {/* Left Pillar */}
      <mesh position={[-3.6, 3.5, 0]}>
        <boxGeometry args={[1.2, 7.5, 1.2]} />
        <meshStandardMaterial color="#1f1816" roughness={0.9} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[3.6, 3.5, 0]}>
        <boxGeometry args={[1.2, 7.5, 1.2]} />
        <meshStandardMaterial color="#1f1816" roughness={0.9} />
      </mesh>
      {/* Pillar Gold Filigree Bands */}
      <mesh position={[-3.6, 3.5, 0.62]}>
        <boxGeometry args={[1.25, 0.15, 0.05]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3.6, 3.5, 0.62]}>
        <boxGeometry args={[1.25, 0.15, 0.05]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top Lintel / Carved Architrave */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[8.6, 1.0, 1.4]} />
        <meshStandardMaterial color="#261e1b" roughness={0.85} />
      </mesh>
      {/* Gold Lintel Trim */}
      <mesh position={[0, 7.1, 0.72]}>
        <boxGeometry args={[8.4, 0.1, 0.04]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Carved Left Door (hinged at x = -3.0) */}
      <group ref={leftDoorRef} position={[-3.0, 0, 0]}>
        <mesh position={[1.5, 3.4, 0]}>
          <boxGeometry args={[3.0, 6.8, 0.25]} />
          <meshStandardMaterial color="#2c170f" roughness={0.7} />
        </mesh>
        {/* Gold Border on Left Door */}
        <mesh position={[1.5, 3.4, 0.14]}>
          <boxGeometry args={[2.7, 6.4, 0.02]} />
          <meshStandardMaterial color="#c9a45c" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[1.5, 3.4, 0.16]}>
          <boxGeometry args={[2.5, 6.2, 0.02]} />
          <meshStandardMaterial color="#1a0c07" roughness={0.8} />
        </mesh>
        {/* Brass Door Studs */}
        {[-0.8, 0, 0.8].map((yOff, i) => (
          <mesh key={i} position={[2.4, 3.4 + yOff * 2, 0.2]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Carved Right Door (hinged at x = 3.0) */}
      <group ref={rightDoorRef} position={[3.0, 0, 0]}>
        <mesh position={[-1.5, 3.4, 0]}>
          <boxGeometry args={[3.0, 6.8, 0.25]} />
          <meshStandardMaterial color="#2c170f" roughness={0.7} />
        </mesh>
        {/* Gold Border on Right Door */}
        <mesh position={[-1.5, 3.4, 0.14]}>
          <boxGeometry args={[2.7, 6.4, 0.02]} />
          <meshStandardMaterial color="#c9a45c" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-1.5, 3.4, 0.16]}>
          <boxGeometry args={[2.5, 6.2, 0.02]} />
          <meshStandardMaterial color="#1a0c07" roughness={0.8} />
        </mesh>
        {/* Brass Door Studs */}
        {[-0.8, 0, 0.8].map((yOff, i) => (
          <mesh key={i} position={[-2.4, 3.4 + yOff * 2, 0.2]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#e8d19a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
