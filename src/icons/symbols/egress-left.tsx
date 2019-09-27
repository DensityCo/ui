import React from "react";

const EgressLeft = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M19.7928932,20.2071068 L19.7928932,22.2071068 L3.79289322,22.2071068 L3.79289322,20.2071068 L19.7928932,20.2071068 Z M11.7928932,1.79289322 L19.5,9.5 L18.0857864,10.9142136 L12.7928932,5.62189322 L12.7928932,18.2071068 L10.7928932,18.2071068 L10.7928932,5.61989322 L5.5,10.9142136 L4.08578644,9.5 L11.7928932,1.79289322 Z"
        transform="rotate(-90 11.793 12)"
      />
    </g>
  </svg>
);

export default EgressLeft;
