import React from "react";

const ArrowUp = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,1.58578644 L20.7071068,10.2928932 L19.2928932,11.7071068 L12.9998932,5.41378644 L13,22 L11,22 L10.9998932,5.41378644 L4.70710678,11.7071068 L3.29289322,10.2928932 L12,1.58578644 Z"
      />
    </g>
  </svg>
);

export default ArrowUp;
