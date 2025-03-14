
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshWobbleMaterial, Sparkles } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";
import * as THREE from "three";

function FloatingGem({ position, color, speed = 0.5, wobbleSpeed = 0.3 }: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number; 
  wobbleSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating motion
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
    
    // Subtle rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <MeshWobbleMaterial 
        color={color} 
        factor={0.3} 
        speed={wobbleSpeed} 
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function Scene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <>
      {/* Dynamic light based on theme */}
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={isDark ? 0.5 : 1.5} 
        color={isDark ? "#7d6cff" : "#92f0d2"} 
      />
      
      {/* Magical gems */}
      <FloatingGem position={[-4, -2, -5]} color={isDark ? "#4834d4" : "#2ed573"} speed={0.4} />
      <FloatingGem position={[4, 0, -7]} color={isDark ? "#7158e2" : "#1e90ff"} speed={0.3} />
      <FloatingGem position={[-3, 2, -9]} color={isDark ? "#3742fa" : "#009432"} speed={0.5} />
      <FloatingGem position={[6, -2, -8]} color={isDark ? "#70a1ff" : "#025c29"} speed={0.2} />
      
      {/* Mystical particles */}
      <Sparkles 
        count={100}
        scale={15}
        size={1}
        speed={0.3}
        opacity={0.5}
        color={isDark ? "#7158e2" : "#2ed573"}
      />
      <Sparkles 
        count={50}
        scale={12}
        size={2}
        speed={0.2}
        opacity={0.3}
        color={isDark ? "#70a1ff" : "#1e90ff"}
      />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

const WebGLBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-60 dark:opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
