import React from "react";

const More = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M14,17 L14,21 L10,21 L10,17 L14,17 Z M14,10 L14,14 L10,14 L10,10 L14,10 Z M14,3 L14,7 L10,7 L10,3 L14,3 Z"
      />
    </g>
  </svg>
);

export default More;
