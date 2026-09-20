"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Drone({ position, offset = 0 }: { position: [number, number, number]; offset?: number }) {
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!droneRef.current) return;
    const t = state.clock.getElapsedTime() * 2 + offset;
    droneRef.current.position.y = position[1] + Math.sin(t) * 0.4;
    droneRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
    droneRef.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={droneRef} position={position}>
      {/* Central Drone Core */}
      <mesh>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color="#1a2035" metalness={0.9} />
      </mesh>
      {/* Glowing Sensor Eye */}
      <mesh position={[0, 0, 0.3]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>
      {/* Rotating Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.55, 0.04, 6, 20]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      {/* Downward Scanning Beam */}
      <pointLight position={[0, -0.3, 0]} color="#00f0ff" intensity={1.5} distance={4} />
    </group>
  );
}

export default function DroneEscorts() {
  return (
    <group>
      <Drone position={[-3.2, 4.5, 4]} offset={0} />
      <Drone position={[3.2, 4.2, 2]} offset={Math.PI / 2} />
      <Drone position={[-3.5, 5.0, -8]} offset={Math.PI} />
      <Drone position={[3.5, 4.8, -10]} offset={Math.PI * 1.5} />
    </group>
  );
}
