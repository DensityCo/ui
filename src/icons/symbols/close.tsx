import React from "react";

const Close = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="12 10.571 15.571 7 17 8.429 13.429 12 17 15.571 15.571 17 12 13.429 8.429 17 7 15.571 10.571 12 7 8.429 8.429 7"
      />
    </g>
  </svg>
);

export default Close;
