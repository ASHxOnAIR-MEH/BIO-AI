"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HeartCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Pulsating effect
      const scale = 1 + Math.sin(t * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = t * 0.3;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.5, 4]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#10b981" // Bio green
        emissive="#047857"
        emissiveIntensity={0.5}
        wireframe
        distort={0.3}
        speed={2}
      />
    </Icosahedron>
  );
}

function CyberShell() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = -t * 0.2;
      groupRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Icosahedron args={[2, 1]}>
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.3} />
      </Icosahedron>
      <Icosahedron args={[2.2, 0]}>
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.15} />
      </Icosahedron>
    </group>
  );
}

function Particles({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#10b981" transparent opacity={0.6} />
    </points>
  );
}

function SceneScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      // Smoothly rotate the entire scene based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (mouse.y * Math.PI) / 10,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (mouse.x * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <HeartCore />
      <CyberShell />
      <Particles />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0f172a]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SceneScene />
      </Canvas>
    </div>
  );
}
