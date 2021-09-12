import React from "react";
import { ImSigma } from "react-icons/im";

export const logoStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.2rem",

  marginTop: "0.5rem",
  marginBottom: "0.5rem",
};

export const sigmaContainerStyle = {
  width: "2rem",
  height: "2rem",
  borderRadius: "0.5rem",
  display: "inline-grid",
  placeItems: "center",
  backgroundColor: "hsl(196, 62%, 62%)",
};

export const SigmaIconStyle = {
  width: "1rem",
  height: "1rem",
  transform: "rotate(-20deg)",
  color: "white",
};

export const headingStyle = {
  fontSize: "1.5rem",
  fontFamily: "Ubuntu",
  fontWeight: "400",
  display: "inline",
  margin: 0,
  color: "black",
};
const Logo = () => {
  return (
    <div>
      <div style={logoStyle}>
        <span style={sigmaContainerStyle}>
          <ImSigma style={SigmaIconStyle} />
        </span>
        <h1 style={headingStyle}>MathCards</h1>
      </div>
    </div>
  );
};

export default Logo;
