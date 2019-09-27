import React from "react";

const Space = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12.5,2 L22,7 L22,17 L12.5,22 L3,17 L3,7 L12.5,2 Z M12.5,13.1300479 L6.22,16.434 L12.5,19.7399042 L18.779,16.434 L12.5,13.1300479 Z M11.5,4.786 L5,8.20746427 L5,14.817 L11.5,11.395 L11.5,4.786 Z M13.5,4.786 L13.5,11.395 L20,14.817 L20,8.20746427 L13.5,4.786 Z"
      />
    </g>
  </svg>
);

export default Space;
