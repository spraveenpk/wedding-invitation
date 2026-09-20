"use client";

interface HouseProps {
  position: [number, number, number];
  rotationY?: number;
}

function TraditionalHouse({ position, rotationY = 0 }: HouseProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Stone / Plinth Base */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[5.2, 0.5, 4.2]} />
        <meshStandardMaterial color="#c2a98e" />
      </mesh>

      {/* House Main Walls (Warm Ochre / Cream) */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[4.8, 2.2, 3.8]} />
        <meshStandardMaterial color="#fff3db" roughness={0.8} />
      </mesh>

      {/* Front Veranda / Thinnai Roof Extender */}
      <mesh position={[0, 1.3, 2.4]}>
        <boxGeometry args={[4.8, 0.2, 1.4]} />
        <meshStandardMaterial color="#f0d5b7" />
      </mesh>

      {/* Veranda Wooden Pillars */}
      {[-2.0, -0.7, 0.7, 2.0].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 2.9]}>
          <cylinderGeometry args={[0.08, 0.1, 1.3, 8]} />
          <meshStandardMaterial color="#59321c" roughness={0.7} />
        </mesh>
      ))}

      {/* Traditional Red Clay Pitched Roof */}
      <mesh position={[0, 3.1, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[3.8, 1.6, 4]} />
        <meshStandardMaterial color="#a94d3f" roughness={0.6} />
      </mesh>

      {/* Front Entrance Wooden Door */}
      <mesh position={[0, 1.2, 1.92]}>
        <boxGeometry args={[1.0, 1.6, 0.08]} />
        <meshStandardMaterial color="#422212" roughness={0.5} />
      </mesh>

      {/* Small Windows */}
      <mesh position={[-1.4, 1.5, 1.92]}>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color="#33180c" />
      </mesh>
      <mesh position={[1.4, 1.5, 1.92]}>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color="#33180c" />
      </mesh>
    </group>
  );
}

export default function Houses() {
  return (
    <group>
      {/* Village houses along the left and right sides */}
      <TraditionalHouse position={[-8.5, 0, 4]} rotationY={Math.PI / 8} />
      <TraditionalHouse position={[-9.5, 0, -13]} rotationY={Math.PI / 10} />

      <TraditionalHouse position={[8.5, 0, 6]} rotationY={-Math.PI / 8} />
      <TraditionalHouse position={[9.5, 0, -3]} rotationY={-Math.PI / 6} />
      <TraditionalHouse position={[9.0, 0, -12]} rotationY={-Math.PI / 8} />
    </group>
  );
}
