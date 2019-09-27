import React from "react";

const ChartLineDown = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="19 14.586 19 12 21 12 21 18 15 18 15 16 17.586 16 12.108 10.522 9.108 14.522 2.293 7.707 3.707 6.293 8.892 11.478 11.892 7.478 19 14.586"
      />
    </g>
  </svg>
);

export default ChartLineDown;
