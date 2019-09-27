import React from "react";

const EgressDown = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20,20.4142136 L20,22.4142136 L4,22.4142136 L4,20.4142136 L20,20.4142136 Z M12,2 L19.7071068,9.70710678 L18.2928932,11.1213203 L13,5.828 L13,18.4142136 L11,18.4142136 L11,5.828 L5.70710678,11.1213203 L4.29289322,9.70710678 L12,2 Z"
        transform="rotate(-180 12 12.207)"
      />
    </g>
  </svg>
);

export default EgressDown;
