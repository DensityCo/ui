import React from "react";

const Study = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        d="M21,7 L22,7 L22,20 L2,20 L2,7 L3,7 L3,5 L21,5 L21,7 Z M13,7 L13,18 L19,18 L19,7 L13,7 Z M5,7 L5,18 L11,18 L11,7 L5,7 Z M6,8 L10,8 L10,10 L6,10 L6,8 Z M6,11 L10,11 L10,13 L6,13 L6,11 Z M6,14 L10,14 L10,16 L6,16 L6,14 Z M14,8 L18,8 L18,10 L14,10 L14,8 Z M14,11 L18,11 L18,13 L14,13 L14,11 Z M14,14 L18,14 L18,16 L14,16 L14,14 Z"
      />
    </g>
  </svg>
);

export default Study;
