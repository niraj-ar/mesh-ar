import { Cylinder, Plane, Ring } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Reticle = ({ hitRef, vis }) => {
  return (
    <>
      <mesh visible={!vis} ref={hitRef}>
        <Cylinder
          args={[0.25, 0.25, 0.01]}
          material-opacity="0.5"
          material-color="darkturquoise"
        />
      </mesh>
    </>
  );
};

export default Reticle;
