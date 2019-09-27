import React from "react";

const ArrowUpRight = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20,4 L20,16 L18,16 L17.9998932,7.414 L5.70710678,19.7071068 L4.29289322,18.2928932 L16.5848932,6 L8,6 L8,4 L20,4 Z"
      />
    </g>
  </svg>
);

export default ArrowUpRight;
