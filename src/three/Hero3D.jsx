import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Flower({ position, scale = 1, color = "#ad8e70", speed = 1 }) {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    group.current.rotation.y = t * 0.2;
    group.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.15;
  });

  const petals = 6;
  return (
    <group position={position} scale={scale} ref={group}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.5,
              0.35 + Math.sin(angle) * 0.1,
              Math.sin(angle) * 0.5,
            ]}
            rotation={[Math.PI / 2 - 0.4, 0, -angle]}
          >
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.1}
              transparent
              opacity={0.92}
            />
          </mesh>
        );
      })}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#f0d9a8" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.6, 0]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.4, 8]} />
        <meshStandardMaterial color="#2f4f3f" roughness={0.8} />
      </mesh>
    </group>
  );
}

function FlowerField() {
  const petals = [
    { pos: [-4.2, 0.2, -2], scale: 1.1, color: "#ad8e70", speed: 0.8 },
    { pos: [-2.6, -0.6, -1], scale: 0.85, color: "#d4af37", speed: 1.1 },
    { pos: [-1.4, 0.4, -3], scale: 1.0, color: "#f0d9a8", speed: 0.9 },
    { pos: [4.2, 0.2, -2], scale: 1.0, color: "#c4a98c", speed: 0.7 },
    { pos: [2.8, -0.5, -1], scale: 0.75, color: "#ad8e70", speed: 1.2 },
    { pos: [1.2, 0.5, -3], scale: 1.2, color: "#d4af37", speed: 0.85 },
    { pos: [-3.4, 0.6, -4], scale: 0.7, color: "#2f4f3f", speed: 0.9 },
    { pos: [3.4, 0.6, -4], scale: 0.7, color: "#2f4f3f", speed: 1.0 },
  ];
  return (
    <>
      {petals.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Flower {...p} />
        </Float>
      ))}
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[30, 20]} />
      <meshStandardMaterial color="#efe6db" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 1.2, 7], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5e6" />
          <pointLight position={[-4, 2, 2]} intensity={0.6} color="#ad8e70" />
          <pointLight position={[4, -2, 3]} intensity={0.4} color="#d4af37" />
          <FlowerField />
          <Ground />
          <Sparkles
            count={120}
            scale={[14, 6, 6]}
            size={3}
            speed={0.4}
            color="#d4af37"
            opacity={0.6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
