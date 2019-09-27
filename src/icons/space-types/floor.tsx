import React from "react";

const Floor = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="17 15 13 15 13 19 7 19 7 17 11 17 11 13 15 13 15 9 19 9 19 3 9 3 9 7 5 7 5 12 7 12 7 9 11 9 11 5 17 5 17 7 13 7 13 11 9 11 9 15 5 15 5 21 15 21 15 17 19 17 19 12 17 12"
      />
    </g>
  </svg>
);

export default Floor;
