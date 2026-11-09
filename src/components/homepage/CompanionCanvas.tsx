import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import model from "@/assets/models/bonfire-companion.glb.asset.json";
import type { SkeletonViewProps } from "./SkeletonPlaceholder";
import { companionIdle } from "./companion-idle";

type SceneProps = SkeletonViewProps & { reducedMotion: boolean; onReady: () => void; onFailure: () => void };
type Palette = Record<"background" | "bone" | "shadow" | "wood" | "bark-light" | "ash" | "fill" | "flame" | "ember", string>;

function makeBark(palette: Palette) {
  const canvas = document.createElement("canvas"); canvas.width = 128; canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = palette.wood; ctx.fillRect(0, 0, 128, 256);
    for (let i = 0; i < 80; i++) {
      ctx.strokeStyle = i % 3 ? palette.shadow : palette["bark-light"];
      ctx.lineWidth = i % 4 + 1;ctx.beginPath();
      const x = (i * 47) % 128; ctx.moveTo(x, 0);
      for (let y = 0; y <= 256; y += 12) ctx.lineTo(x + Math.sin(i * 2 + y / 31) * 3, y);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Sculpture({ palette, reducedMotion, onReady }: { palette: Palette; reducedMotion: boolean; onReady: () => void }) {
  const { scene } = useGLTF(model.url, false);
  const { invalidate } = useThree();
  const clone = useMemo(() => scene.clone(true), [scene]);
  const fire = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const time = useRef(0); const announced = useRef(false); const frames = useRef(0);
  const parts = useMemo(() => ({
    torso: clone.getObjectByName("IdleTorso"), head: clone.getObjectByName("IdleHead"),
    hand: clone.getObjectByName("IdleRightArm"),
  }), [clone]);
  const bark = useMemo(() => makeBark(palette), [palette]);
  useEffect(() => () => bark.dispose(), [bark]);
  useFrame((_, delta) => {
    time.current += Math.min(delta, 0.05);
    const pose = companionIdle(time.current, reducedMotion);
    if (parts.torso) parts.torso.rotation.z = pose.body;
    if (parts.head) { parts.head.rotation.y = pose.head; parts.head.rotation.x = pose.body * 0.5; }
    if (parts.hand) parts.hand.rotation.x = pose.hand;
    if (fire.current) { fire.current.scale.y = pose.fire; fire.current.rotation.y = reducedMotion ? 0 : Math.sin(time.current * 2) * 0.08; }
    if (light.current) light.current.intensity = 3.5 * pose.fire;
    // The previous frame has drawn the loaded model by the second callback.
    frames.current += 1;
    if (!announced.current) {
      if (frames.current > 1) { announced.current = true; onReady(); }
      else invalidate();
    }
  });
  return (
    <>
      <group position={[-0.65, 0, 0]} rotation={[0, 0.14, 0]}>
        <primitive object={clone} />
        <mesh position={[0, 0.55, -0.09]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.29, 1.9, 14]} />
          <meshStandardMaterial map={bark} roughness={0.98} />
        </mesh>
        {[-0.955, 0.955].map(x => (
          <mesh key={x} position={[x, 0.55, -0.09]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.23, 0.23, 0.008, 20]} />
            <meshStandardMaterial color={palette["bark-light"]} roughness={0.92} />
          </mesh>
        ))}
      </group>
      <group position={[0.95, 0.05, 0.35]}>
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]} position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.075, 0.095, 0.83, 10]} />
            <meshStandardMaterial map={bark} roughness={1} color={palette.wood} />
          </mesh>
        ))}
        <group ref={fire} position={[0, 0.14, 0]}>
          {([[-0.16, 0.15, 0.04, 0.19, 0.42], [0.1, 0.23, 0, 0.16, 0.62], [0, 0.19, 0.1, 0.13, 0.46]] as const).map((p, i) => (
            <mesh key={i} position={[p[0], p[1], p[2]]} rotation={[0, i * 1.2, i === 0 ? -0.2 : 0.15]}>
              <coneGeometry args={[p[3], p[4], 9, 1]} />
              <meshStandardMaterial color={palette.flame} emissive={palette.ember} emissiveIntensity={1.5} roughness={0.9} />
            </mesh>
          ))}
        </group>
        <pointLight ref={light} color={palette.flame} position={[0, 0.75, 0]} intensity={3.5} distance={5} decay={2} />
      </group>
      <mesh position={[0, 0.015, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial color={palette.ash} roughness={1} map={bark} />
      </mesh>
    </>
  );
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

export default function CompanionCanvas({ reducedMotion, onReady, onFailure }: SceneProps) {
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    const names: (keyof Palette)[] = ["background", "bone", "shadow", "wood", "bark-light", "ash", "fill", "flame", "ember"];
    return Object.fromEntries(names.map(name => [name, css.getPropertyValue(`--scene-${name}`).trim()])) as Palette;
  }, []);
  return (
    <Canvas camera={{ position: [3.1, 2.8, 6.7], fov: 34, near: 0.1, far: 30 }} dpr={[1, 1.5]} frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      onCreated={({ camera, gl }) => { camera.lookAt(0, 1.12, 0); gl.setClearColor(palette.background); }}>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.background, 7, 15]} />
      <ambientLight intensity={0.65} />
      <directionalLight color={palette.fill} position={[-3, 5, 4]} intensity={2.4} />
      <Environment resolution={64}>
        <Lightformer color={palette.bone} intensity={1.2} position={[0, 5, 1]} scale={[8, 8, 1]} />
        <Lightformer color={palette.fill} intensity={0.8} position={[-4, 2, -1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>
      <ContextGuard onFailure={onFailure} />
      <Suspense fallback={null}><Sculpture palette={palette} reducedMotion={reducedMotion} onReady={onReady} /></Suspense>
    </Canvas>
  );
}