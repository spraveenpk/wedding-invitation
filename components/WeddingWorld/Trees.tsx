"use client";

function VillageTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.45, 2.4, 8]} />
        <meshStandardMaterial color="#68422b" roughness={0.9} />
      </mesh>
      {/* Foliage Spheres for Lush Appearance */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[1.5, 14, 14]} />
        <meshStandardMaterial color="#2d6330" roughness={0.7} />
      </mesh>
      <mesh position={[0.5, 3.4, 0.3]}>
        <sphereGeometry args={[1.1, 12, 12]} />
        <meshStandardMaterial color="#387a3c" roughness={0.7} />
      </mesh>
      <mesh position={[-0.4, 3.2, -0.4]}>
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshStandardMaterial color="#27592a" roughness={0.7} />
      </mesh>
    </group>
  );
}

export default function Trees() {
  return (
    <group>
      <VillageTree position={[-7.5, 0, 9]} />
      <VillageTree position={[-7.0, 0, -1]} />
      <VillageTree position={[-8.0, 0, -8]} />
      <VillageTree position={[-7.5, 0, -17]} />

      <VillageTree position={[7.5, 0, 10]} />
      <VillageTree position={[7.0, 0, 1]} />
      <VillageTree position={[8.0, 0, -7]} />
      <VillageTree position={[7.5, 0, -17]} />
    </group>
  );
}
