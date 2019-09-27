import React from "react";

const ArrowLeft = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M11.7928932,1.79289322 L20.5,10.5 L19.0857864,11.9142136 L12.7927864,5.62089322 L12.7928932,22.2071068 L10.7928932,22.2071068 L10.7927864,5.62089322 L4.5,11.9142136 L3.08578644,10.5 L11.7928932,1.79289322 Z"
        transform="rotate(-90 11.793 12)"
      />
    </g>
  </svg>
);

export default ArrowLeft;
