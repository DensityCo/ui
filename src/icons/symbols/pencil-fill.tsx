import React from "react";

const PencilFill = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M14.047619,7.47619048 L16.5238095,9.95238095 L8.47619048,18 L6,18 L6,15.5238095 L14.047619,7.47619048 Z M17.5238095,4 L20,6.47619048 L18.1428571,8.33333333 L15.6666667,5.85714286 L17.5238095,4 Z"
      />
    </g>
  </svg>
);

export default PencilFill;
