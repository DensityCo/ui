import React from "react";

const Share2 = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M5,14 L5,20 L19,20 L19,14 L21,14 L21,22 L3,22 L3,14 L5,14 Z M12,1.58578644 L19.7071068,9.29289322 L18.2928932,10.7071068 L12.9998932,5.41378644 L13,18 L11,18 L10.9998932,5.41378644 L5.70710678,10.7071068 L4.29289322,9.29289322 L12,1.58578644 Z"
      />
    </g>
  </svg>
);

export default Share2;
