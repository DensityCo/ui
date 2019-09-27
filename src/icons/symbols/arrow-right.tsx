import React from "react";

const ArrowRight = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12.2071068,1.79289322 L20.9142136,10.5 L19.5,11.9142136 L13.207,5.62089322 L13.2071068,22.2071068 L11.2071068,22.2071068 L11.207,5.62089322 L4.91421356,11.9142136 L3.5,10.5 L12.2071068,1.79289322 Z"
        transform="rotate(90 12.207 12)"
      />
    </g>
  </svg>
);

export default ArrowRight;
