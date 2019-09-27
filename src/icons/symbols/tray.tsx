import React from "react";

const Tray = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20,16 L20,18 L4,18 L4,16 L20,16 Z M20,11 L20,13 L4,13 L4,11 L20,11 Z M20,6 L20,8 L4,8 L4,6 L20,6 Z"
      />
    </g>
  </svg>
);

export default Tray;
