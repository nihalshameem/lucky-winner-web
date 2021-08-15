import React from "react";
import { RiLoader5Fill } from "react-icons/ri";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  fontSize: "18px",
  zIndex: 100,
  background: "#fff",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
};
const animate = {
  animationName: "App-logo-spin",
  animationDuration: "1s",
  animationIterationCount: "infinite",
};

export default function LoaderMini() {
  return (
    <div style={style}>
      <RiLoader5Fill style={animate} /> Loading...
    </div>
  );
}
