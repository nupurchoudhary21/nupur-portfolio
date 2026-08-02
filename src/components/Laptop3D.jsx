import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  OrbitControls,
  MeshTransmissionMaterial,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Palette + constants                                                 */
/* ------------------------------------------------------------------ */

const AMBER = "#f2a65a";
const CYAN = "#7dd3e8";
const MAGENTA = "#e87dd8";

// Central hue-cycling color driver used by RGB edge lighting / keyboard wave.
function hueColor(t, offset = 0, speed = 0.08, sat = 0.75, light = 0.58) {
  const h = (t * speed + offset) % 1;
  return new THREE.Color().setHSL(h < 0 ? h + 1 : h, sat, light);
}

const TERMINAL_LINES = [
  "$ deploy --target=edge --strict",
  "> compiling neural graph... ok",
  "> tokenizer  ok  128k vocab",
  "> attention   [########..] 82%",
  "",
  "class SentenceCompressor(nn.Module):",
  "    def __init__(self, dim=768, k=128):",
  "        super().__init__()",
  "        self.proj = nn.Linear(dim, k)",
  "",
  "    def forward(self, x):",
  "        z = self.proj(x)",
  "        return repair_geometry(z)",
  "",
  "# latency  auto-scaled",
  "optimizer.step()",
  "",
];

/* ------------------------------------------------------------------ */
/* Dynamic canvas textures                                             */
/* ------------------------------------------------------------------ */

/** Split-panel screen texture: scrolling terminal (left) + live AI dashboard bars (right). */
function useDashboardTexture() {
  const { ctx, canvas, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { ctx, canvas, texture };
  }, []);

  const scrollRef = useRef(0);
  const barsRef = useRef(new Array(16).fill(0).map(() => Math.random()));

  useFrame((state, delta) => {
    scrollRef.current += delta * 26;
    const t = state.clock.getElapsedTime();

    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // divider
    ctx.strokeStyle = "rgba(125,211,232,0.35)";
    ctx.beginPath();
    ctx.moveTo(380, 8);
    ctx.lineTo(380, canvas.height - 8);
    ctx.stroke();

    // --- left: scrolling terminal ---
    ctx.font = "13px 'IBM Plex Mono', monospace";
    const lineHeight = 20;
    const total = TERMINAL_LINES.length * lineHeight;
    const off = scrollRef.current % total;
    for (let pass = 0; pass < 2; pass++) {
      TERMINAL_LINES.forEach((l, i) => {
        const y = i * lineHeight - off + pass * total + 20;
        if (y > -lineHeight && y < canvas.height + lineHeight) {
          ctx.fillStyle = l.trim().startsWith("#")
            ? "#5b6478"
            : l.startsWith("$") || l.startsWith(">")
            ? CYAN
            : i % 3 === 0
            ? AMBER
            : "#c9d6e3";
          ctx.fillText(l, 14, y);
        }
      });
    }

    // --- right: AI dashboard ---
    ctx.fillStyle = AMBER;
    ctx.font = "bold 15px 'IBM Plex Mono', monospace";
    ctx.fillText("SYSTEM.AI", 400, 28);
    ctx.fillStyle = "rgba(242,166,90,0.5)";
    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.fillText("throughput / core load", 400, 44);

    const bars = barsRef.current;
    const barW = (640 - 400 - 16) / bars.length;
    for (let i = 0; i < bars.length; i++) {
      bars[i] += (Math.random() - 0.5) * 0.12;
      bars[i] = Math.max(0.08, Math.min(1, bars[i]));
      const h = bars[i] * 150;
      const x = 400 + i * barW;
      const y = 210 - h;
      const grad = ctx.createLinearGradient(0, y, 0, 210);
      grad.addColorStop(0, CYAN);
      grad.addColorStop(1, "#1a4a5c");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW - 3, h);
    }
    ctx.strokeStyle = "rgba(125,211,232,0.6)";
    ctx.beginPath();
    ctx.moveTo(400, 210);
    ctx.lineTo(624, 210);
    ctx.stroke();

    // radial "scanning" ring readout
    const cx = 512,
      cy = 300,
      r = 55;
    ctx.strokeStyle = "rgba(125,211,232,0.25)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + ((t * 0.6) % (Math.PI * 2)));
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = "#e8f4f8";
    ctx.font = "bold 18px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(60 + Math.sin(t) * 20)}%`, cx, cy + 6);
    ctx.textAlign = "left";

    texture.needsUpdate = true;
  });

  return texture;
}

/* ------------------------------------------------------------------ */
/* Small reusable pieces                                               */
/* ------------------------------------------------------------------ */

/** Emissive strip that both pulses AND cycles hue — the RGB edge lighting. */
function RGBEdgeStrip({ args, position, rotation, offset = 0, speed = 1.2, base = 0.6 }) {
  const mat = useRef();
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const t = clock.getElapsedTime();
    mat.current.color.copy(hueColor(t, offset, 0.06));
    mat.current.opacity = base + Math.sin(t * speed + offset * 6) * 0.2;
  });
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshBasicMaterial ref={mat} color={AMBER} transparent opacity={base} toneMapped={false} />
    </mesh>
  );
}

/** Per-key RGB wave keyboard using a single instanced mesh for performance. */
function KeyDeck() {
  const rows = 5;
  const cols = 13;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push([(c - (cols - 1) / 2) * 0.15, (r - (rows - 1) / 2) * 0.15]);
      }
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.forEach(([x, z], i) => {
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      const wave = (x + z) * 1.6 + t * 1.4;
      const c = hueColor(wave, 0, 0.16, 0.85, 0.55);
      meshRef.current.setColorAt(i, c);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[0, 0.102, -0.15]}>
      <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
        <boxGeometry args={[0.115, 0.012, 0.115]} />
        <meshStandardMaterial
          color="#111a2c"
          emissive={CYAN}
          emissiveIntensity={0.55}
          roughness={0.45}
          metalness={0.5}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/** Segmented mechanical hinge: several cylinder blocks with visible gaps instead of one bar. */
function SegmentedHinge() {
  const segments = 7;
  const totalLength = 2.5;
  const gap = 0.05;
  const segLength = totalLength / segments - gap;
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {new Array(segments).fill(0).map((_, i) => {
        const x = -totalLength / 2 + segLength / 2 + i * (segLength + gap);
        return (
          <mesh key={i} position={[0, x, 0]}>
            <cylinderGeometry args={[0.05, 0.05, segLength, 16]} />
            <meshStandardMaterial color="#0a0e18" metalness={0.9} roughness={0.28} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Animated cooling vents — a KITT-style scanner sweep across a row of slits. */
function CoolingVents({ position }) {
  const count = 9;
  const stripsRef = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    stripsRef.current.forEach((m, i) => {
      if (!m) return;
      const phase = (t * 0.9 - i * 0.18) % (count * 0.5);
      const glow = Math.max(0, 1 - Math.abs(phase - count * 0.25) / (count * 0.25));
      m.opacity = 0.15 + glow * 0.85;
    });
  });
  return (
    <group position={position}>
      {new Array(count).fill(0).map((_, i) => (
        <mesh key={i} position={[(i - (count - 1) / 2) * 0.045, 0, 0]}>
          <boxGeometry args={[0.02, 0.01, 0.09]} />
          <meshBasicMaterial
            ref={(el) => (stripsRef.current[i] = el)}
            color={CYAN}
            transparent
            opacity={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Laptop model                                                        */
/* ------------------------------------------------------------------ */

function LaptopModel() {
  const dashboardTexture = useDashboardTexture();
  const powerLed = useRef();
  const underglow = useRef();
  const bodyRef = useRef();

  // breathing + hovering
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (powerLed.current) {
      powerLed.current.intensity = 1.2 + Math.sin(t * 2) * 0.6;
    }
    if (underglow.current) {
      underglow.current.intensity = 1.6 + Math.sin(t * 1.6) * 0.7;
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = -0.35 + Math.sin(t * 0.5) * 0.055;
      bodyRef.current.rotation.y = 0.5 + Math.sin(t * 0.18) * 0.06;
      const breathe = 1 + Math.sin(t * 0.8) * 0.006;
      bodyRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={bodyRef} position={[0, -0.35, 0]} rotation={[0, 0.5, 0]}>
      {/* ultra-thin titanium base shell */}
      <RoundedBox args={[2.6, 0.09, 1.7]} radius={0.045} smoothness={4}>
        <meshPhysicalMaterial
          color="#8b8f96"
          metalness={0.95}
          roughness={0.32}
          clearcoat={0.5}
          clearcoatRoughness={0.35}
          reflectivity={0.9}
        />
      </RoundedBox>

      {/* cyan underglow light + emissive belly strip */}
      <pointLight ref={underglow} position={[0, -0.15, 0]} color={CYAN} intensity={1.6} distance={1.6} />
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.5, 0.006, 1.6]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* RGB edge lighting strips running around the chassis */}
      <RGBEdgeStrip args={[2.42, 0.012, 0.012]} position={[0, 0.005, 0.845]} offset={0} />
      <RGBEdgeStrip args={[2.42, 0.012, 0.012]} position={[0, 0.005, -0.845]} offset={0.33} />
      <RGBEdgeStrip args={[0.012, 0.012, 1.6]} position={[1.29, 0.005, 0]} offset={0.5} />
      <RGBEdgeStrip args={[0.012, 0.012, 1.6]} position={[-1.29, 0.005, 0]} offset={0.66} />

      {/* animated cooling vents, back edge */}
      <CoolingVents position={[-0.9, 0, -0.84]} />
      <CoolingVents position={[0.9, 0, -0.84]} />

      {/* side port slits */}
      {[-1.31, 1.31].map((x, i) => (
        <group key={i} position={[x, 0.0, 0.15]}>
          <mesh>
            <boxGeometry args={[0.02, 0.025, 0.32]} />
            <meshStandardMaterial color="#05070c" roughness={0.9} />
          </mesh>
          <mesh position={[x < 0 ? 0.011 : -0.011, 0, 0]}>
            <boxGeometry args={[0.002, 0.016, 0.22]} />
            <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.8} />
          </mesh>
        </group>
      ))}

      {/* keyboard deck */}
      <RoundedBox args={[2.35, 0.022, 1.45]} radius={0.02} position={[0, 0.06, -0.05]}>
        <meshStandardMaterial color="#1c1f24" metalness={0.5} roughness={0.5} />
      </RoundedBox>

      <KeyDeck />

      {/* power LED */}
      <mesh position={[1.1, 0.075, 0.72]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial color={AMBER} toneMapped={false} />
      </mesh>
      <pointLight ref={powerLed} position={[1.1, 0.085, 0.72]} color={AMBER} intensity={1.2} distance={0.35} />

      {/* glass trackpad */}
      <RoundedBox args={[0.7, 0.006, 0.45]} radius={0.02} position={[0, 0.075, 0.55]}>
        <MeshTransmissionMaterial
          thickness={0.15}
          roughness={0.06}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          color="#141b2c"
          backside
        />
      </RoundedBox>

      {/* screen assembly, hinged at the back of the base */}
      <group position={[0, 0.055, -0.82]} rotation={[-0.35, 0, 0]}>
        <SegmentedHinge />
        <RGBEdgeStrip args={[2.4, 0.01, 0.01]} position={[0, 0, 0.052]} offset={0.8} speed={1.6} />

        {/* outer lid shell */}
        <RoundedBox args={[2.54, 1.64, 0.05]} radius={0.08} smoothness={4} position={[0, 0.8, -0.06]}>
          <meshBasicMaterial color={CYAN} transparent opacity={0.12} toneMapped={false} />
        </RoundedBox>

        <RoundedBox args={[2.5, 1.6, 0.06]} radius={0.07} smoothness={4} position={[0, 0.8, -0.03]}>
          <meshPhysicalMaterial color="#8b8f96" metalness={0.92} roughness={0.3} clearcoat={0.6} />
        </RoundedBox>

        {/* glowing hue-cycling emblem ring on the lid back */}
        <RGBEdgeStrip args={[0.13, 0.13, 0.01]} position={[0, 0.8, -0.065]} offset={0.15} />

        {/* floating laminated glass display — offset in front of the panel with a visible air-gap */}
        <group position={[0, 0.8, 0.06]}>
          {/* protective glass layer, physically separated from the emissive pixel layer */}
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[2.3, 1.42]} />
            <MeshTransmissionMaterial
              thickness={0.06}
              roughness={0.03}
              transmission={0.97}
              ior={1.5}
              chromaticAberration={0.06}
              color="#dfeeff"
              backside
            />
          </mesh>

          {/* dynamic terminal + AI dashboard pixel layer */}
          <mesh>
            <planeGeometry args={[2.28, 1.4]} />
            <meshBasicMaterial map={dashboardTexture} toneMapped={false} />
          </mesh>

          {/* bezel light strip for depth cue */}
          <mesh position={[0, 0, -0.004]}>
            <ringGeometry args={[1.42, 1.44, 4]} />
            <meshBasicMaterial color={AMBER} transparent opacity={0.16} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Camera rig — subtle cinematic drift layered on top of OrbitControls */
/* ------------------------------------------------------------------ */

function CinematicCamera() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.y += Math.sin(t * 0.35) * 0.0008;
    camera.fov = 34 + Math.sin(t * 0.25) * 0.6;
    camera.updateProjectionMatrix();
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Root export                                                         */
/* ------------------------------------------------------------------ */

export default function Laptop3D({ className = "" }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [1.6, 1.3, 6], fov: 34 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          setDpr(Math.min(2, gl.getPixelRatio()));
        }}
        performance={{ min: 0.5 }}
      >
        {/* no <color>/<fog> here — canvas stays transparent so the page's
            own Particles background shows through behind the laptop */}

        <ambientLight intensity={0.55} color="#2a3350" />
        <pointLight position={[2.5, 2, 3]} intensity={3.2} color={AMBER} />
        <pointLight position={[-3, 1, -2]} intensity={2.4} color={CYAN} />
        <pointLight position={[-1.5, 2.2, -3.5]} intensity={1.4} color={MAGENTA} />
        <spotLight position={[0, 4, 1]} angle={0.4} penumbra={1} intensity={1.1} color="#ffffff" />
        {/* rim light for a cinematic silhouette edge */}
        <spotLight position={[-2, 1.2, -4]} angle={0.5} penumbra={0.8} intensity={2} color={CYAN} />

        <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.3}>
          <LaptopModel />
        </Float>

        <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={8} blur={2.6} far={3} />

        {/* <Environment preset="city" /> */}
        <CinematicCamera />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3.2}
          maxDistance={9}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.62}
          autoRotate
          autoRotateSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
          target={[0, 0, -0.3]}
        />
      </Canvas>
    </div>
  );
}