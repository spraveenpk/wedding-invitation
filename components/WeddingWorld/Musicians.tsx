"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NadaswaramPlayer({ position, flip = false }: { position: [number, number, number]; flip?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pipeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 4;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t) * 0.05;
    }
    if (pipeRef.current) {
      pipeRef.current.rotation.x = -0.3 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, flip ? -Math.PI / 4 : Math.PI / 4, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#7a4f32" />
      </mesh>
      {/* Turban / Peta */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.25, 12]} />
        <meshStandardMaterial color="#d41468" roughness={0.4} />
      </mesh>
      {/* Body / Kurta */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.9, 12]} />
        <meshStandardMaterial color="#fff7e8" />
      </mesh>
      {/* Veshti */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.35, 0.37, 0.8, 12]} />
        <meshStandardMaterial color="#f0d49a" />
      </mesh>

      {/* Nadaswaram (Golden Pipe) */}
      <group ref={pipeRef} position={[0, 1.7, 0.25]}>
        {/* Slender body */}
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 1.1, 12]} />
          <meshStandardMaterial color="#4a2923" roughness={0.3} />
        </mesh>
        {/* Golden Flared Bell */}
        <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.25, 16]} />
          <meshStandardMaterial color="#d9a441" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function ThavilPlayer({ position, flip = false }: { position: [number, number, number]; flip?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 8;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 0.5)) * 0.06;
    }
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.rotation.x = Math.sin(t) * 0.4;
      rightHandRef.current.rotation.x = -Math.cos(t) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, flip ? -Math.PI / 3 : Math.PI / 3, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#7a4f32" />
      </mesh>
      {/* Festive Headband */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.1, 12]} />
        <meshStandardMaterial color="#b72d3a" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.34, 0.4, 0.9, 12]} />
        <meshStandardMaterial color="#f1ce72" />
      </mesh>
      {/* Veshti */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.36, 0.38, 0.8, 12]} />
        <meshStandardMaterial color="#fffcf4" />
      </mesh>

      {/* Thavil Drum (Barrel shaped drum across waist) */}
      <group position={[0, 1.1, 0.38]}>
        {/* Barrel Body */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.75, 16]} />
          <meshStandardMaterial color="#5a2f1c" roughness={0.4} />
        </mesh>
        {/* Drum Heads (Leather skins) */}
        <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
          <meshStandardMaterial color="#e8d8be" />
        </mesh>
        <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
          <meshStandardMaterial color="#e8d8be" />
        </mesh>
        {/* Metallic Tension Hoops */}
        <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.26, 0.02, 8, 20]} />
          <meshStandardMaterial color="#d49a43" metalness={0.7} />
        </mesh>
        <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.26, 0.02, 8, 20]} />
          <meshStandardMaterial color="#d49a43" metalness={0.7} />
        </mesh>
      </group>

      {/* Left Hand with Drumstick */}
      <mesh ref={leftHandRef} position={[-0.45, 1.25, 0.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
        <meshStandardMaterial color="#7a4f32" />
      </mesh>

      {/* Right Hand with Mallet */}
      <mesh ref={rightHandRef} position={[0.45, 1.25, 0.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
        <meshStandardMaterial color="#7a4f32" />
      </mesh>
    </group>
  );
}

export default function Musicians() {
  return (
    <group>
      {/* Left flank musicians */}
      <NadaswaramPlayer position={[-2.8, 0, 4]} />
      <ThavilPlayer position={[-2.8, 0, 1]} />

      {/* Right flank musicians */}
      <NadaswaramPlayer position={[2.8, 0, 4]} flip />
      <ThavilPlayer position={[2.8, 0, 1]} flip />
    </group>
  );
}
