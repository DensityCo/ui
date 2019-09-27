import React from "react";

const SpaceAdd = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12.5,2 L13.5,2.526 L13.5,11.395 L20,14.817 L20,11 L22,11 L22,17 L12.5,22 L3,17 L3,7 L12.5,2 Z M12.5,13.1300479 L6.22,16.434 L12.5,19.7399042 L18.779,16.434 L12.5,13.1300479 Z M11.5,4.786 L5,8.20746427 L5,14.817 L11.5,11.395 L11.5,4.786 Z M19,3 L19,5 L21,5 L21,7 L19,7 L19,9 L17,9 L17,7 L15,7 L15,5 L17,5 L17,3 L19,3 Z"
      />
    </g>
  </svg>
);

export default SpaceAdd;
