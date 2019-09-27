import React from "react";

const UtilityRoom = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M3,22 L3,20 L6,20 L6,2 L18,2 L18,20 L21,20 L21,22 L6,22 L3,22 Z M16,4 L8,4 L8,20 L16,20 L16,4 Z M13.125,9 L12.375,11.3333333 L15,11.3333333 L15,11.6666667 L11.25,15 L10.875,15 L11.625,12.6666667 L9,12.6666667 L9,12.324056 L12.75,9 L13.125,9 Z"
      />
    </g>
  </svg>
);

export default UtilityRoom;
