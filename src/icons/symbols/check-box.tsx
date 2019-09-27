import React from "react";

const CheckBox = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M22,2 L22,22 L2,22 L2,2 L22,2 Z M20,4 L4,4 L4,20 L20,20 L20,4 Z M17.2928932,7.29289322 L18.7071068,8.70710678 L10,17.4142136 L5.29289322,12.7071068 L6.70710678,11.2928932 L10,14.5857864 L17.2928932,7.29289322 Z"
      />
    </g>
  </svg>
);

export default CheckBox;
