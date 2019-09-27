import React from "react";

const Door = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,2 L18,19.999 L21,20 L21,22 L18,21.999 L18,22 L6,22 L6,21.999 L3,22 L3,20 L6,19.999 L6,2 L18,2 Z M16,4 L8,4 L8,19.999 L16,19.999 L16,4 Z M11,10 L11,14 L9,14 L9,10 L11,10 Z"
      />
    </g>
  </svg>
);

export default Door;
