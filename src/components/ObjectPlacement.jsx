import React, { Suspense, useRef, useState } from "react";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Chair from "../Models/Chair";
import Reticle from "../Models/Reticle";
import {
  ARButton,
  useHitTest,
  useInteraction,
  useXR,
  XR,
} from "@react-three/xr";

const ObjectPlacement = () => {
  const [vis, setVis] = useState(false);
  const [pos, setPos] = useState({});

  const hitRef = useRef();

  const onClick = () => {
    setVis(true);
    setPos(hitRef.current.position);
  };

  const HitTest = () => {
    const isPresenting = useXR((state) => state.isPresenting);

    useHitTest((hitMatrix) => {
      if (!hitMatrix.isMatrix && isPresenting) {
        hitMatrix.decompose(
          hitRef.current.position,
          hitRef.current.quaternion,
          hitRef.current.scale
        );
      }
    });

    useInteraction(hitRef, "onSelect", onClick);
    return (
      <>
        <Chair vis={vis} pos={pos} />
        <Reticle hitRef={hitRef} vis={vis} />
      </>
    );
  };

  return (
    <>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test", "viewer"] }} />
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <XR referenceSpace="local-floor" foveation={1}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <HitTest />
          </Suspense>
          <OrbitControls />
        </XR>
        <Environment preset="city" />
      </Canvas>
      <Loader />
    </>
  );
};

export default ObjectPlacement;
