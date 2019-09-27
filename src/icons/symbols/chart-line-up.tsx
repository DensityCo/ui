import React from "react";

const ChartLineUp = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="17.586 8 15 8 15 6 21 6 21 12 19 12 19 9.414 11.892 16.522 8.892 12.522 3.707 17.707 2.293 16.293 9.108 9.478 12.108 13.478"
      />
    </g>
  </svg>
);

export default ChartLineUp;
