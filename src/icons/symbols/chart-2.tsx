import React from "react";

const Chart2 = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M4,3 L4,20 L22,20 L22,22 L2,22 L2,3 L4,3 Z M22,7 L22,13 L20,13 L19.999,10.415 L13.9170811,16.4971324 L10,11.6007811 L6.78086881,15.624695 L5.21913119,14.375305 L10,8.39921894 L14.0829189,13.5028676 L18.584,9 L16,9 L16,7 L22,7 Z"
      />
    </g>
  </svg>
);

export default Chart2;
