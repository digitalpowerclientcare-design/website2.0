"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  varying vec2 vUv;

  vec3 blend(vec3 a, vec3 b, float t) {
    return mix(a, b, smoothstep(0.0, 1.0, t));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;
    float wave1 = sin(uv.x * 3.0 + t) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 2.5 - t * 0.8) * 0.5 + 0.5;
    float wave3 = sin((uv.x + uv.y) * 2.0 + t * 0.6) * 0.5 + 0.5;

    vec3 col = blend(uColor1, uColor2, wave1);
    col = blend(col, uColor3, wave2 * 0.7);
    col = blend(col, uColor4, wave3 * 0.5);
    col = blend(col, uColor5, uv.y * 0.4 + wave1 * 0.2);

    float vignette = 1.0 - length(uv - 0.5) * 0.35;
    gl_FragColor = vec4(col * vignette, 1.0);
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

type GradientMeshProps = {
  variant?: "light" | "dark";
};

export function GradientMesh({ variant = "light" }: GradientMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colors = useMemo(() => {
    const wrap = (hex: string) => ({ value: hexToVec3(hex) });
    if (variant === "dark") {
      return {
        uColor1: wrap("#18184A"),
        uColor2: wrap("#5046E5"),
        uColor3: wrap("#3730A3"),
        uColor4: wrap("#6257F0"),
        uColor5: wrap("#18184A"),
      };
    }
    return {
      uColor1: wrap("#e8e4ff"),
      uColor2: wrap("#c4b5fd"),
      uColor3: wrap("#818cf8"),
      uColor4: wrap("#f0f4ff"),
      uColor5: wrap("#ddd6fe"),
    };
  }, [variant]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      ...colors,
    }),
    [colors],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-0.21, 0, -0.12]} scale={[2.8, 1.6, 1]}>
      <planeGeometry args={[6, 4, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
