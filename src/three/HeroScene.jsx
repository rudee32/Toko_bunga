import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

const UP = new THREE.Vector3(0, 1, 0);
const PETALS = 8;

/**
 * Field layout. The cluster hugs the lower third of the hero so it frames
 * the headline instead of sitting on top of it, and spreads wide enough
 * that the copy stays clear in the middle at every aspect ratio.
 */
const FLOWERS = [
  { x: -4.35, y: -0.85, z: -2.4, s: 1.05, petal: "#ad8e70", speed: 0.8, phase: 0.0 },
  { x: -2.95, y: -1.15, z: -1.1, s: 0.82, petal: "#c4a98c", speed: 1.1, phase: 1.4 },
  { x: -1.55, y: -1.45, z: -2.9, s: 0.95, petal: "#f0e6d8", speed: 0.9, phase: 2.7 },
  { x: 1.55, y: -1.45, z: -2.9, s: 0.95, petal: "#c4a98c", speed: 0.95, phase: 4.1 },
  { x: 2.95, y: -1.15, z: -1.1, s: 0.82, petal: "#ad8e70", speed: 1.2, phase: 5.3 },
  { x: 4.35, y: -0.85, z: -2.4, s: 1.05, petal: "#ad8e70", speed: 0.7, phase: 0.8 },
  { x: -3.8, y: -1.55, z: -4.3, s: 0.68, petal: "#8a6f52", speed: 0.9, phase: 3.3 },
  { x: 3.8, y: -1.55, z: -4.3, s: 0.68, petal: "#8a6f52", speed: 1.0, phase: 2.2 },
];

const CLUSTER_W = 11.4;

function Field() {
  const petals = useRef();
  const centers = useRef();
  const stems = useRef();
  const leaves = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!petals.current || !stems.current) return;

    FLOWERS.forEach((f, i) => {
      const bob = Math.sin(t * f.speed + f.phase) * 0.11;
      const sway = Math.sin(t * f.speed * 0.55 + f.phase) * 0.13;
      const hx = f.x + sway;
      const hy = f.y + 0.6 + bob;
      const hz = f.z;

      // stem
      dummy.position.set(f.x + sway * 0.3, f.y + 0.3, f.z);
      dummy.rotation.set(0, 0, sway * 0.18);
      dummy.scale.set(f.s, f.s, f.s);
      dummy.updateMatrix();
      stems.current.setMatrixAt(i, dummy.matrix);
      stems.current.setColorAt(i, color.set("#2f4f3f"));

      // leaves
      for (let l = 0; l < 2; l++) {
        const side = l === 0 ? -1 : 1;
        const ly = f.y + 0.18 + l * 0.26;
        const a = side * (0.5 + 0.22 * l) + sway * 0.3;
        dummy.position.set(f.x + Math.sin(a) * 0.2, ly, f.z + Math.cos(a) * 0.05);
        dummy.rotation.set(0, a, 0.5 - l * 0.9);
        dummy.scale.set(0.34 * f.s, 0.05 * f.s, 0.16 * f.s);
        dummy.updateMatrix();
        leaves.current.setMatrixAt(i * 2 + l, dummy.matrix);
        leaves.current.setColorAt(i * 2 + l, color.set("#2f4f3f"));
      }

      // centre
      dummy.position.set(hx, hy, hz);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.15 * f.s);
      dummy.updateMatrix();
      centers.current.setMatrixAt(i, dummy.matrix);
      centers.current.setColorAt(i, color.set("#8a6814"));

      // petals
      for (let p = 0; p < PETALS; p++) {
        const a = (p / PETALS) * Math.PI * 2 + t * 0.08 * f.speed;
        dir.set(Math.cos(a), -0.52, Math.sin(a)).normalize();
        dummy.position.set(hx + dir.x * 0.27, hy + dir.y * 0.27, hz + dir.z * 0.27);
        dummy.quaternion.setFromUnitVectors(UP, dir);
        const inner = p % 2 === 1;
        const k = (inner ? 0.2 : 0.28) * f.s;
        dummy.scale.set(k, (inner ? 0.24 : 0.34) * f.s, k);
        dummy.updateMatrix();
        petals.current.setMatrixAt(i * PETALS + p, dummy.matrix);
        petals.current.setColorAt(i * PETALS + p, color.set(f.petal));
      }
    });

    petals.current.instanceMatrix.needsUpdate = true;
    centers.current.instanceMatrix.needsUpdate = true;
    stems.current.instanceMatrix.needsUpdate = true;
    leaves.current.instanceMatrix.needsUpdate = true;
    if (petals.current.instanceColor) petals.current.instanceColor.needsUpdate = true;
    if (centers.current.instanceColor) centers.current.instanceColor.needsUpdate = true;
    if (stems.current.instanceColor) stems.current.instanceColor.needsUpdate = true;
    if (leaves.current.instanceColor) leaves.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <Instances ref={petals} limit={FLOWERS.length * PETALS} castShadow={false}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial roughness={0.55} metalness={0} flatShading />
        {FLOWERS.map((f, i) =>
          Array.from({ length: PETALS }, (_, p) => (
            <Instance key={`${i}-${p}`} />
          ))
        )}
      </Instances>

      <Instances ref={centers} limit={FLOWERS.length}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial roughness={0.7} metalness={0} />
        {FLOWERS.map((f, i) => (
          <Instance key={i} />
        ))}
      </Instances>

      <Instances ref={stems} limit={FLOWERS.length}>
        <cylinderGeometry args={[0.026, 0.042, 1, 6]} />
        <meshStandardMaterial roughness={0.85} metalness={0} />
        {FLOWERS.map((f, i) => (
          <Instance key={i} />
        ))}
      </Instances>

      <Instances ref={leaves} limit={FLOWERS.length * 2}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial roughness={0.8} metalness={0} flatShading />
        {FLOWERS.map((f, i) =>
          [0, 1].map((l) => <Instance key={`${i}-${l}`} />)
        )}
      </Instances>
    </>
  );
}

/**
 * Fits the cluster to the visible viewport so the composition holds from
 * portrait tablets (aspect 0.75) to ultrawide (aspect 2.4+). Without this,
 * portrait viewports crop 6 of the 8 blooms out of frame entirely.
 */
function Framing({ children }) {
  const group = useRef();
  const viewport = useThree((s) => s.viewport);

  const k = Math.min(1.05, Math.max(0.4, viewport.width / CLUSTER_W));
  const drop = -Math.min(1.1, viewport.height * 0.16);

  return (
    <group ref={group} scale={k} position-y={drop}>
      {children}
    </group>
  );
}

export default function HeroScene({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 8], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "default",
      }}
      frameloop={active ? "always" : "never"}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 5]} intensity={1.5} color="#fff6ea" />
      <directionalLight position={[-5, 1, 2]} intensity={0.35} color="#c4a98c" />

      <Framing>
        <Field />
        <ContactShadows
          position={[0, -1.62, 0]}
          scale={CLUSTER_W * 1.15}
          far={3}
          blur={2.8}
          opacity={0.32}
          resolution={512}
          color="#7d6244"
          frames={1}
        />
      </Framing>
    </Canvas>
  );
}
