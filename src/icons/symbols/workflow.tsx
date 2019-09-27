import React from "react";

const Workflow = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M17,13 L7,13 L7,15 L10,15 L10,22 L2,22 L2,15 L5,15 L5,11 L11,11 L11,9 L6,9 L6,2 L18,2 L18,9 L13,9 L13,11 L19,11 L19,15 L22,15 L22,22 L14,22 L14,15 L17,15 L17,13 Z M8,17 L4,17 L4,20 L8,20 L8,17 Z M20,17 L16,17 L16,20 L20,20 L20,17 Z M16,4 L8,4 L8,7 L16,7 L16,4 Z"
      />
    </g>
  </svg>
);

export default Workflow;
