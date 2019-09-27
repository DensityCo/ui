import React from "react";

const StairsDown = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M22,8 L22,10 L18,10 L18,14 L14,14 L14,18 L10,18 L10,22 L8,22 L8,16 L12,16 L12,12 L16,12 L16,8 L22,8 Z M11.2928932,3.29289322 L12.7071068,4.70710678 L6.414,10.9998932 L9,11 L9,13 L3,13 L3,7 L5,7 L5,9.58389322 L11.2928932,3.29289322 Z"
      />
    </g>
  </svg>
);

export default StairsDown;
