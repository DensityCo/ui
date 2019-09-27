import React from "react";

const ArrowUpLeft = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M19.7071068,4 L19.7071068,16 L17.7071068,16 L17.707,7.414 L5.41421356,19.7071068 L4,18.2928932 L16.292,6 L7.70710678,6 L7.70710678,4 L19.7071068,4 Z"
        transform="rotate(-90 11.854 11.854)"
      />
    </g>
  </svg>
);

export default ArrowUpLeft;
