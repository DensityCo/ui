import React from "react";

const Cafe = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,2 L18,4 L20,4 L20,6 L18.667,6 L16,22 L8,22 L5.333,6 L4,6 L4,4 L6,4 L6,2 L18,2 Z M16.6390792,6 L7.36092084,6 L9.69425418,20 L14.3057458,20 L16.6390792,6 Z"
      />
    </g>
  </svg>
);

export default Cafe;
