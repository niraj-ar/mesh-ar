import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Chair from "../Models/Chair";
import { OrbitControls } from "@react-three/drei";

const Rotate = () => {
  return (
    <div>
      <Canvas shadows style={{ width: "100vw", height: "100vh" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <directionalLight
            intensity={0.5}
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
          />
          <Chair />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Rotate;
