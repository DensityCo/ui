import React from "react";

const ChevronDown = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="7.659 9.247 6.341 10.753 12 15.704 17.659 10.753 16.341 9.247 12 13.046"
      />
    </g>
  </svg>
);

export default ChevronDown;
