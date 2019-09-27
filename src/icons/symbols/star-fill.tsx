import React from "react";

const StarFill = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="12 17.772 5.82 21.021 7 14.139 2 9.265 8.91 8.261 12 2 15.09 8.261 22 9.265 17 14.139 18.18 21.021"
      />
    </g>
  </svg>
);

export default StarFill;
