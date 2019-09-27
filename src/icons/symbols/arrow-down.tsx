import React from "react";

const ArrowDown = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,2 L20.7071068,10.7071068 L19.2928932,12.1213203 L12.9998932,5.828 L13,22.4142136 L11,22.4142136 L10.9998932,5.828 L4.70710678,12.1213203 L3.29289322,10.7071068 L12,2 Z"
        transform="rotate(-180 12 12.207)"
      />
    </g>
  </svg>
);

export default ArrowDown;
