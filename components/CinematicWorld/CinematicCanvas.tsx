"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import TempleDoorway from "./TempleDoorway";
import FloatingCard3D from "./FloatingCard3D";
import FloatingFrames from "./FloatingFrames";
import Kuthuvilakku3D from "./Kuthuvilakku3D";
import MandapDecor3D from "./MandapDecor3D";
import PetalsParticles from "./PetalsParticles";

interface CinematicCanvasProps {
  progress: number; // 0 to 1
}

function CameraRig({ progress }: { progress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lookAtTarget = useRef(new THREE.Vector3(0, 3.5, 10));

  useFrame(() => {
    if (!cameraRef.current) return;

    // Calculate target camera position based on scrollProgress
    let targetX = 0;
    let targetY = 3.6;
    let targetZ = 16;
    let lookX = 0;
    let lookY = 3.5;
    let lookZ = 10;

    if (progress < 0.15) {
      // 0 - 15%: In front of temple door, approaching
      const p = progress / 0.15;
      targetZ = THREE.MathUtils.lerp(16.5, 12.0, p);
      targetY = THREE.MathUtils.lerp(3.6, 3.5, p);
      lookZ = 10;
    } else if (progress < 0.38) {
      // 15 - 38%: Through the doors into the memory corridor
      const p = (progress - 0.15) / 0.23;
      targetZ = THREE.MathUtils.lerp(12.0, 4.0, p);
      targetY = THREE.MathUtils.lerp(3.5, 3.0, p);
      targetX = Math.sin(p * Math.PI) * 0.4;
      lookZ = THREE.MathUtils.lerp(10, 0, p);
      lookY = 3.0;
    } else if (progress < 0.58) {
      // 38 - 58%: Facing the 3D invitation card
      const p = (progress - 0.38) / 0.20;
      targetZ = THREE.MathUtils.lerp(4.0, 1.2, p);
      targetY = THREE.MathUtils.lerp(3.0, 2.8, p);
      targetX = 0;
      lookZ = -2;
      lookY = 2.8;
    } else if (progress < 0.78) {
      // 58 - 78%: Moving toward the sacred mandapam
      const p = (progress - 0.58) / 0.20;
      targetZ = THREE.MathUtils.lerp(1.2, -8.0, p);
      targetY = THREE.MathUtils.lerp(2.8, 3.2, p);
      lookZ = -18;
      lookY = 3.0;
    } else if (progress < 0.95) {
      // 78 - 95%: Elevated sanctuary view
      const p = (progress - 0.78) / 0.17;
      targetZ = THREE.MathUtils.lerp(-8.0, -10.5, p);
      targetY = THREE.MathUtils.lerp(3.2, 4.0, p);
      lookZ = -18;
      lookY = 2.8;
    } else {
      // 95 - 100%: Reassembly into black
      const p = (progress - 0.95) / 0.05;
      targetZ = THREE.MathUtils.lerp(-10.5, -4.0, p);
      targetY = THREE.MathUtils.lerp(4.0, 2.8, p);
      lookZ = -2;
      lookY = 2.5;
    }

    // Smooth LERP camera movement
    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.07);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.07);
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.07);

    // Smooth LERP lookAt target
    lookAtTarget.current.x = THREE.MathUtils.lerp(lookAtTarget.current.x, lookX, 0.07);
    lookAtTarget.current.y = THREE.MathUtils.lerp(lookAtTarget.current.y, lookY, 0.07);
    lookAtTarget.current.z = THREE.MathUtils.lerp(lookAtTarget.current.z, lookZ, 0.07);

    cameraRef.current.lookAt(lookAtTarget.current);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 3.6, 16.5]} fov={50} />;
}

function Scene({ progress }: { progress: number }) {
  // Temple door opening progress (starts opening between 0.04 and 0.15)
  const doorProgress = Math.min(1, Math.max(0, (progress - 0.04) / 0.11));

  // Overall light intensity increases as you enter, dims down at end
  const ambientIntensity = progress < 0.05 ? 0.3 : progress > 0.95 ? 0.2 : 1.1;

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#0b0807", 8, 38]} />

      <ambientLight intensity={ambientIntensity} color="#f7f0e2" />
      <directionalLight position={[10, 18, 12]} intensity={1.8} color="#e8d19a" />
      <directionalLight position={[-8, 12, -10]} intensity={1.2} color="#c9a45c" />

      {/* Stone Floor with Royal Wine Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[60, 100]} />
        <meshStandardMaterial color="#0e0a09" roughness={0.9} />
      </mesh>
      {/* Central Silk Carpet Aisle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[4.8, 80]} />
        <meshStandardMaterial color="#24070f" roughness={0.7} />
      </mesh>
      {/* Gold Aisle Borders */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.45, 0.01, 0]}>
        <planeGeometry args={[0.1, 80]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.45, 0.01, 0]}>
        <planeGeometry args={[0.1, 80]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.8} />
      </mesh>

      {/* 3D Scene Elements */}
      <TempleDoorway doorProgress={doorProgress} />
      <FloatingFrames progress={progress} />
      <FloatingCard3D progress={progress} />
      <Kuthuvilakku3D />
      <MandapDecor3D position={[0, 0, -18]} />
      <PetalsParticles count={95} progress={progress} />

      {/* Floating Golden Dust Particles */}
      <Sparkles count={120} scale={[20, 12, 40]} size={2.5} speed={0.4} color="#e8d19a" />
      <Environment preset="sunset" />
    </>
  );
}

export default function CinematicCanvas({ progress }: CinematicCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas>
        <CameraRig progress={progress} />
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
