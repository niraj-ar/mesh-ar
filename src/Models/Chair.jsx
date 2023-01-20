import React, { useRef, useState } from "react";
import { SoftShadows, useGLTF } from "@react-three/drei";
import { useInteraction } from "@react-three/xr";

export default function Model({ vis, pos }) {
  const { nodes, materials } = useGLTF("/chair.gltf");

  const [rotate, setRotate] = useState([0, 0, 0]);

  const ModRef = useRef();

  useInteraction(ModRef, "onMove", () => {
    console.log("onMove");
    console.log("ModRef", ModRef);
    setRotate([0, rotate[1] + Math.PI / 100, 0]);
    console.log("Rotation", rotate);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[1, 8, -1.3]}
        intensity={1}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />
      <group dispose={null}>
        <mesh
          ref={ModRef}
          castShadow
          receiveShadow
          visible={vis}
          geometry={nodes.koltuk.geometry}
          material={materials.chair}
          position={pos}
          rotation={rotate}
        />
        <mesh
          position={[0, 1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[2, 2]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <SoftShadows samples={20} />
      </group>
    </>
  );
}

useGLTF.preload("/chair.gltf");
