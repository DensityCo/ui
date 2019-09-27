import React from "react";

const ChevronRight = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="8.772 8.134 10.277 6.817 15.228 12.476 10.277 18.134 8.772 16.817 12.571 12.476"
      />
    </g>
  </svg>
);

export default ChevronRight;
