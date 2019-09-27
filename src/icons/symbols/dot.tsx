import React from "react";

const Dot = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <circle cx={12} cy={12} r={5} fill={color} fillRule="nonzero" />
    </g>
  </svg>
);

export default Dot;
