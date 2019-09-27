import React from "react";

const Copy = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path
      fill={color}
      d="M14,16 L8,16 L8,18 L18,18 L18,6 L14,6 L14,16 Z M12,14 L12,2 L2,2 L2,14 L12,14 Z M14,4 L20,4 L20,20 L6,20 L6,16 L0,16 L0,0 L14,0 L14,4 Z"
      transform="translate(2 2)"
    />
  </svg>
);

export default Copy;
