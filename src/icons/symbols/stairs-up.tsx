import React from "react";

const StairsUp = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M22,8 L22,10 L18,10 L18,14 L14,14 L14,18 L10,18 L10,22 L8,22 L8,16 L12,16 L12,12 L16,12 L16,8 L22,8 Z M13,3 L13,9 L11,9 L10.9998932,6.414 L4.70710678,12.7071068 L3.29289322,11.2928932 L9.58489322,5 L7,5 L7,3 L13,3 Z"
      />
    </g>
  </svg>
);

export default StairsUp;
