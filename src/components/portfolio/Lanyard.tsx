/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>();
  const fixed = useRef<any>();
  const j1 = useRef<any>();
  const j2 = useRef<any>();
  const j3 = useRef<any>();
  const card = useRef<any>();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 };
  
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  // Create card texture with canvas
  const cardTexture = useRef<THREE.CanvasTexture | null>(null);
  
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext('2d')!;
    
    // Card background - gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 720);
    gradient.addColorStop(0, '#1a1030');
    gradient.addColorStop(0.5, '#2d1b69');
    gradient.addColorStop(1, '#1a1030');
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, 512, 720, 20);
    ctx.fill();
    
    // Top accent bar
    const accentGrad = ctx.createLinearGradient(0, 0, 512, 0);
    accentGrad.addColorStop(0, '#8b5cf6');
    accentGrad.addColorStop(1, '#a78bfa');
    ctx.fillStyle = accentGrad;
    ctx.fillRect(0, 0, 512, 8);
    
    // Avatar circle placeholder
    ctx.beginPath();
    ctx.arc(256, 220, 80, 0, Math.PI * 2);
    ctx.fillStyle = '#3b2a7a';
    ctx.fill();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Avatar text
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#a78bfa';
    ctx.textAlign = 'center';
    ctx.fillText('HV', 256, 238);
    
    // Name
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Harsha Vardhan', 256, 360);
    
    // Title
    ctx.font = '22px Arial';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('Software Engineer', 256, 400);
    
    // Location
    ctx.font = '18px Arial';
    ctx.fillStyle = '#8888aa';
    ctx.fillText('📍 Madurai, India', 256, 440);
    
    // Status bar
    ctx.fillStyle = '#22c55e22';
    ctx.roundRect(120, 480, 272, 40, 20);
    ctx.fill();
    ctx.strokeStyle = '#22c55e44';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#22c55e';
    ctx.fillText('🟢 Open to opportunities', 256, 506);
    
    // Tech tags
    const tags = ['React', 'Node.js', 'Flutter', 'AI'];
    const tagWidth = 90;
    const startX = 256 - ((tags.length * (tagWidth + 10)) / 2) + tagWidth / 2;
    tags.forEach((tag, i) => {
      const x = startX + i * (tagWidth + 10);
      ctx.fillStyle = '#8b5cf622';
      ctx.roundRect(x - tagWidth / 2, 550, tagWidth, 32, 16);
      ctx.fill();
      ctx.font = '14px Arial';
      ctx.fillStyle = '#a78bfa';
      ctx.fillText(tag, x, 572);
    });
    
    // Bottom decorative dots
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(180 + i * 40, 650, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf644';
      ctx.fill();
    }
    
    cardTexture.current = new THREE.CanvasTexture(canvas);
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* Card front face */}
            <mesh>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={cardTexture.current}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            {/* Card back face */}
            <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.01]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                color="#1a1030"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            {/* Clip */}
            <mesh position={[0, 1.125, 0.02]}>
              <boxGeometry args={[0.2, 0.15, 0.05]} />
              <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#8b5cf6"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
