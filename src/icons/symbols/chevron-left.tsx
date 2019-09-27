import React from "react";

const ChevronLeft = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="14.228 8.134 10.429 12.476 14.228 16.817 12.723 18.134 7.772 12.476 12.723 6.817"
      />
    </g>
  </svg>
);

export default ChevronLeft;
