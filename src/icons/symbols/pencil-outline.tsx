import React from "react";

const PencilOutline = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,0.585786438 L23.4142136,6 L7.41421356,22 L2,22 L2,16.5857864 L18,0.585786438 Z M15,6.41478644 L4,17.4142136 L4,20 L6.58578644,20 L17.585,8.99978644 L15,6.41478644 Z M18,3.41421356 L16.414,4.99978644 L19,7.58578644 L20.5857864,6 L18,3.41421356 Z"
      />
    </g>
  </svg>
);

export default PencilOutline;
