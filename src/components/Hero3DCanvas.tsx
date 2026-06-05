"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { heroScrollState } from "./HeroSection";

function FloatingLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, 0, -5]} intensity={0.5} color="#0B4D68" />
      <pointLight position={[10, 5, 5]} intensity={0.8} color="#FF7A30" />
      <pointLight position={[0, -5, 5]} intensity={0.6} color="#E8D7B9" />
    </>
  );
}

function TextSystem() {
  const { camera } = useThree();
  const rakayaRef = useRef<THREE.Group>(null);
  const notATourRef = useRef<THREE.Group>(null);
  const discoverRef = useRef<THREE.Group>(null);
  const silenceRef = useRef<THREE.Group>(null);
  const elementsRef = useRef<THREE.Group>(null);

  // Mouse interpolation
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);

  useFrame((state) => {
    const progress = heroScrollState.progress;

    // 1. Mouse Tilt Effect
    targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, state.pointer.x * 0.15, 0.05);
    targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, state.pointer.y * -0.1, 0.05);

    if (rakayaRef.current) {
      rakayaRef.current.rotation.y = targetRotationY.current;
      rakayaRef.current.rotation.x = targetRotationX.current;
    }

    // 2. Camera journey & depth transitions based on scroll progress (0 to 1)
    // The camera starts at z = 6 and travels forward as progress advances.
    // At the same time, we'll cross-fade and move text positions.
    const targetZ = 6 - progress * 24;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    // Slight tilt of camera based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.5, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * -0.3, 0.08);
    camera.lookAt(0, 0, camera.position.z - 5);

    // 3. Animating individual scenes based on progress milestones
    // Scene 1: RAKAYA (progress: 0 to 0.18)
    if (rakayaRef.current) {
      // Scale from 2.0 down to 1.0 inside GSAP or lerp here
      const p1 = Math.max(0, Math.min(1, progress / 0.18));
      rakayaRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
      
      // Fade out as camera approaches
      const opacity = Math.max(0, 1 - Math.max(0, (progress - 0.12) / 0.08));
      rakayaRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }

    // Scene 2: NOT A TOUR / AN EXPERIENCE (progress: 0.18 to 0.38, target z-axis: -2)
    if (notATourRef.current) {
      // parallax rotation
      notATourRef.current.rotation.y = targetRotationY.current * 1.5;
      
      // Fade in and out
      let opacity = 0;
      if (progress > 0.14 && progress <= 0.22) {
        opacity = (progress - 0.14) / 0.08; // fade in
      } else if (progress > 0.22 && progress <= 0.32) {
        opacity = 1;
      } else if (progress > 0.32 && progress <= 0.40) {
        opacity = 1 - (progress - 0.32) / 0.08; // fade out
      }
      
      notATourRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }

    // Scene 3: DISCOVER HIDDEN WATERWAYS (progress: 0.38 to 0.58, target z-axis: -8)
    if (discoverRef.current) {
      // Fade in and out
      let opacity = 0;
      if (progress > 0.34 && progress <= 0.42) {
        opacity = (progress - 0.34) / 0.08;
      } else if (progress > 0.42 && progress <= 0.52) {
        opacity = 1;
      } else if (progress > 0.52 && progress <= 0.60) {
        opacity = 1 - (progress - 0.52) / 0.08;
      }

      // Add a slight ripple distortion effect by modifying scaling/rotation
      const wave = Math.sin(state.clock.getElapsedTime() * 3) * 0.03;
      discoverRef.current.rotation.z = wave;
      
      discoverRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }

    // Scene 4: FEEL THE SILENCE (progress: 0.58 to 0.78, target z-axis: -14)
    if (silenceRef.current) {
      let opacity = 0;
      if (progress > 0.54 && progress <= 0.62) {
        opacity = (progress - 0.54) / 0.08;
      } else if (progress > 0.62 && progress <= 0.72) {
        opacity = 1;
      } else if (progress > 0.72 && progress <= 0.80) {
        opacity = 1 - (progress - 0.72) / 0.08;
      }
      
      silenceRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }

    // Scene 5: SUNRISE / SUNSET / ADVENTURE (progress: 0.78 to 1.0, target z-axis: -20)
    if (elementsRef.current) {
      let opacity = 0;
      if (progress > 0.74 && progress <= 0.82) {
        opacity = (progress - 0.74) / 0.08;
      } else if (progress > 0.82) {
        opacity = 1;
      }
      
      // Let's add scale pulse
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
      elementsRef.current.scale.set(pulse, pulse, pulse);

      elementsRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }
  });

  return (
    <>
      {/* 3D Fog */}
      <fog attach="fog" args={["#072C3D", 2, 25]} />

      {/* Background Water Particles */}
      <Sparkles
        count={200}
        scale={[20, 20, 30]}
        size={2.5}
        speed={0.6}
        color="#E8D7B9"
        opacity={0.3}
      />
      <Sparkles
        count={150}
        scale={[15, 15, 30]}
        size={1.5}
        speed={1.2}
        color="#FF7A30"
        opacity={0.4}
      />

      {/* SCENE 1: RAKAYA */}
      <group ref={rakayaRef} position={[0, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
            fontSize={1.4}
            maxWidth={10}
            lineHeight={1}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.15}
          >
            RAKAYA
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.9}
              reflectivity={1.0}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
            />
          </Text>
        </Float>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.22}
          letterSpacing={0.4}
          color="#E8D7B9"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          KANNUR • KERALA
          <meshBasicMaterial color="#E8D7B9" />
        </Text>
        <Text
          position={[0, -1.25, 0]}
          fontSize={0.16}
          letterSpacing={0.2}
          color="#FF7A30"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          PADDLE INTO THE WILD
          <meshBasicMaterial color="#FF7A30" />
        </Text>
      </group>

      {/* SCENE 2: NOT A TOUR / AN EXPERIENCE */}
      <group ref={notATourRef} position={[0, 0, -6]}>
        <Text
          fontSize={0.7}
          maxWidth={8}
          textAlign="center"
          lineHeight={1.2}
          letterSpacing={0.1}
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          NOT A TOUR
          {"\n"}
          <meshPhysicalMaterial
            color="#E8D7B9"
            roughness={0.2}
            metalness={0.8}
            clearcoat={0.5}
          />
        </Text>
        <Text
          position={[0, -0.85, 0.2]}
          fontSize={0.55}
          maxWidth={8}
          textAlign="center"
          color="#FF7A30"
          letterSpacing={0.08}
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          AN EXPERIENCE
          <meshPhysicalMaterial
            color="#FF7A30"
            roughness={0.1}
            metalness={0.5}
          />
        </Text>
      </group>

      {/* SCENE 3: DISCOVER HIDDEN WATERWAYS */}
      <group ref={discoverRef} position={[0, 0, -12]}>
        <Text
          fontSize={0.65}
          maxWidth={10}
          textAlign="center"
          lineHeight={1.1}
          letterSpacing={0.1}
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          DISCOVER
          {"\n"}
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.3}
            metalness={0.7}
          />
        </Text>
        <Text
          position={[0, -0.8, 0.1]}
          fontSize={0.5}
          maxWidth={10}
          textAlign="center"
          color="#0B4D68"
          letterSpacing={0.15}
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          HIDDEN WATERWAYS
          <meshPhysicalMaterial
            color="#E8D7B9"
            roughness={0.2}
            metalness={0.6}
          />
        </Text>
      </group>

      {/* SCENE 4: FEEL THE SILENCE */}
      <group ref={silenceRef} position={[0, 0, -18]}>
        <Text
          fontSize={0.75}
          maxWidth={9}
          textAlign="center"
          lineHeight={1.2}
          letterSpacing={0.12}
          color="#FFFFFF"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          FEEL THE SILENCE
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.9}
          />
        </Text>
      </group>

      {/* SCENE 5: SUNRISE / SUNSET / ADVENTURE */}
      <group ref={elementsRef} position={[0, 0, -24]}>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.5}
          letterSpacing={0.2}
          textAlign="center"
          color="#E8D7B9"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          SUNRISE
          <meshBasicMaterial color="#E8D7B9" />
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          letterSpacing={0.2}
          textAlign="center"
          color="#FF7A30"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          SUNSET
          <meshBasicMaterial color="#FF7A30" />
        </Text>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.6}
          letterSpacing={0.25}
          textAlign="center"
          color="#FFFFFF"
          font="https://fonts.gstatic.com/s/outfit/v11/0YbnMX40npR1KH8452c.woff"
        >
          ADVENTURE
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.8}
          />
        </Text>
      </group>
    </>
  );
}

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <FloatingLights />
        <TextSystem />
      </Canvas>
    </div>
  );
}
