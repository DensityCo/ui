import * as React from "react";

const ZoomToFit = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M8 2H2V8H4V4H8V2Z" fill={color} />
      <path d="M16 20V22H22V16H20V20H16Z" fill={color} />
      <path d="M2 16H4L4 20H8V22H2V16Z" fill={color} />
      <path d="M20 8L22 8V2H16V4L20 4V8Z" fill={color} />
    </svg>
  );


export default ZoomToFit;

