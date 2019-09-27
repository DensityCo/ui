import React from "react";

const SaveFill = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,2 L22,6 L22,22 L2,22 L2,2 L18,2 Z M18,13 L6,13 L6,19 L18,19 L18,13 Z M14,15 L14,17 L8,17 L8,15 L14,15 Z M14,6 L6,6 L6,8 L14,8 L14,6 Z"
      />
    </g>
  </svg>
);

export default SaveFill;
