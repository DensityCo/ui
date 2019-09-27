import React from "react";

const Chart1 = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M4,3 L4,20 L22,20 L22,22 L2,22 L2,3 L4,3 Z M8,14 L8,18 L6,18 L6,14 L8,14 Z M12,6 L12,18 L10,18 L10,6 L12,6 Z M16,11 L16,18 L14,18 L14,11 L16,11 Z M20,9 L20,18 L18,18 L18,9 L20,9 Z"
      />
    </g>
  </svg>
);

export default Chart1;
