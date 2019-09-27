import React from "react";

const ChevronUp = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="7.659 14.704 6.341 13.199 12 8.247 17.659 13.199 16.341 14.704 12 10.905"
      />
    </g>
  </svg>
);

export default ChevronUp;
