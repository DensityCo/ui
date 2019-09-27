import React from "react";

const Filter = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M15,16 L15,18 L9,18 L9,16 L15,16 Z M17,11 L17,13 L7,13 L7,11 L17,11 Z M20,6 L20,8 L4,8 L4,6 L20,6 Z"
      />
    </g>
  </svg>
);

export default Filter;
