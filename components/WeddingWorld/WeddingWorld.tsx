"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import Groom from "./Groom";
import Musicians from "./Musicians";
import Guests from "./Guests";
import Temple from "./Temple";
import Houses from "./Houses";
import Flags from "./Flags";
import Lamps from "./Lamps";
import Flowers from "./Flowers";
import Mandap from "./Mandap";
import Trees from "./Trees";

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
      <planeGeometry args={[140, 140]} />
      <meshStandardMaterial color="#c29b68" roughness={0.9} />
    </mesh>
  );
}

// Royal Winding Red Ceremonial Pathway with Golden Borders
function CeremonialPath() {
  return (
    <group position={[0, 0, 0]}>
      {/* Base Red Silk Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[6.8, 75]} />
        <meshStandardMaterial color="#6e0d1b" roughness={0.7} />
      </mesh>

      {/* Central Auspicious Deep Maroon Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[5.2, 75]} />
        <meshStandardMaterial color="#4a0404" roughness={0.6} />
      </mesh>

      {/* Left Golden Zari Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.3, 0.03, 0]}>
        <planeGeometry args={[0.25, 75]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right Golden Zari Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.3, 0.03, 0]}>
        <planeGeometry args={[0.25, 75]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function CinematicParallaxRig() {
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cameraGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Very subtle breathing camera parallax so world feels alive
    cameraGroupRef.current.position.x = Math.sin(t * 0.3) * 0.4;
    cameraGroupRef.current.position.y = 5.2 + Math.cos(t * 0.4) * 0.2;
  });

  return (
    <group ref={cameraGroupRef}>
      <PerspectiveCamera makeDefault position={[0, 5.2, 19]} fov={48} />
    </group>
  );
}

function World({ onBellClick }: { onBellClick?: () => void }) {
  return (
    <>
      {/* Warm Golden-Hour Sunset Sky & Atmospheric Fog */}
      <color attach="background" args={["#e8935c"]} />
      <fog attach="fog" args={["#d97843", 18, 70]} />

      <ambientLight intensity={1.5} color="#fff1e0" />
      <directionalLight
        position={[18, 22, 14]}
        intensity={3.0}
        color="#ffdda1"
        castShadow
      />

      {/* Landscape & Environment */}
      <Ground />
      <CeremonialPath />
      <Trees />
      <Houses />
      <Temple onBellClick={onBellClick} />

      {/* Procession Accents */}
      <Flags />
      <Lamps />
      <Flowers count={110} />

      {/* Characters & Procession */}
      <Guests />
      <Musicians />
      <Groom />

      {/* Grand Sacred Mandapam */}
      <Mandap position={[0, 0, -20]} />

      {/* Firefly Glowing Particles & Golden Dust */}
      <Sparkles
        count={150}
        scale={[28, 14, 45]}
        size={3}
        speed={0.4}
        color="#ffd966"
      />
      <Environment preset="sunset" />
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={38}
        maxPolarAngle={Math.PI / 2 - 0.04}
      />
    </>
  );
}

interface WeddingWorldProps {
  onBellClick?: () => void;
}

export default function WeddingWorld({ onBellClick }: WeddingWorldProps) {
  return (
    <div className="h-screen w-full relative select-none">
      <Canvas>
        <CinematicParallaxRig />
        <World onBellClick={onBellClick} />
      </Canvas>
    </div>
  );
}
