import React from "react";

const ArrowDownLeft = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M19.7071068,4.29289322 L19.7071068,16.2928932 L17.7071068,16.2928932 L17.707,7.70689322 L5.41421356,20 L4,18.5857864 L16.292,6.29289322 L7.70710678,6.29289322 L7.70710678,4.29289322 L19.7071068,4.29289322 Z"
        transform="rotate(-180 11.854 12.146)"
      />
    </g>
  </svg>
);

export default ArrowDownLeft;
