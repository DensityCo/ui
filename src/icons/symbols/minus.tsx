import React from "react";

const Minus = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="5 13.333 5 11 19 11 19 13.333"
      />
    </g>
  </svg>
);

export default Minus;
