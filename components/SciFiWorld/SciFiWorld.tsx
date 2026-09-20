"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import LaserGrid from "./LaserGrid";
import CyberMandap from "./CyberMandap";
import HoverSpeeder from "./HoverSpeeder";
import DroneEscorts from "./DroneEscorts";
import WarpParticles from "./WarpParticles";

function DynamicCameraRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle action camera drift
    group.current.position.x = Math.sin(t * 0.4) * 0.5;
    group.current.position.y = 4.8 + Math.cos(t * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      <PerspectiveCamera makeDefault position={[0, 4.8, 18]} fov={52} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#03050e"]} />
      <fog attach="fog" args={["#03050e", 15, 65]} />

      {/* Cosmic Lighting */}
      <ambientLight intensity={0.6} color="#456882" />
      <directionalLight position={[10, 20, 15]} intensity={2.5} color="#00f0ff" />
      <directionalLight position={[-10, 15, -10]} intensity={2.0} color="#b026ff" />

      {/* Deep Space Cosmic Stars */}
      <Stars radius={60} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />

      {/* Futuristic Scene Objects */}
      <LaserGrid />
      <CyberMandap position={[0, 0, -22]} />
      <HoverSpeeder position={[0, 1.2, 6]} />
      <DroneEscorts />
      <WarpParticles count={140} />

      {/* Floating Neon Sparkles */}
      <Sparkles count={100} scale={[25, 15, 40]} size={3} speed={0.8} color="#00f0ff" />

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={35}
        maxPolarAngle={Math.PI / 2 - 0.03}
      />
    </>
  );
}

export default function SciFiWorld() {
  return (
    <div className="h-screen w-full relative select-none">
      <Canvas>
        <DynamicCameraRig />
        <Scene />
      </Canvas>
    </div>
  );
}
