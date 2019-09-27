import React from "react";

const Building = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M11,20 L11,4 L4,4 L4,20 L11,20 Z M13,6 L22,6 L22,22 L2,22 L2,2 L13,2 L13,6 Z M13,8 L13,20 L20,20 L20,8 L13,8 Z M5,5 L7,5 L7,8 L5,8 L5,5 Z M5,9 L7,9 L7,12 L5,12 L5,9 Z M5,13 L7,13 L7,16 L5,16 L5,13 Z M14,13 L16,13 L16,16 L14,16 L14,13 Z M14,9 L16,9 L16,12 L14,12 L14,9 Z M8,5 L10,5 L10,8 L8,8 L8,5 Z M8,9 L10,9 L10,12 L8,12 L8,9 Z M8,13 L10,13 L10,16 L8,16 L8,13 Z M17,13 L19,13 L19,16 L17,16 L17,13 Z M17,9 L19,9 L19,12 L17,12 L17,9 Z"
      />
    </g>
  </svg>
);

export default Building;
