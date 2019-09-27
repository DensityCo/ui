import React from "react";

const ArrowDownRight = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20,4.29289322 L20,16.2928932 L18,16.2928932 L17.9998932,7.70689322 L5.70710678,20 L4.29289322,18.5857864 L16.5848932,6.29289322 L8,6.29289322 L8,4.29289322 L20,4.29289322 Z"
        transform="rotate(90 12.146 12.146)"
      />
    </g>
  </svg>
);

export default ArrowDownRight;
