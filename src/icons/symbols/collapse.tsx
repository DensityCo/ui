import React from "react";

const Collapse = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M7.70710678,13.2928932 L12,17.5857864 L16.2928932,13.2928932 L17.7071068,14.7071068 L12,20.4142136 L6.29289322,14.7071068 L7.70710678,13.2928932 Z M12,6.41421356 L7.70710678,10.7071068 L6.29289322,9.29289322 L12,3.58578644 L17.7071068,9.29289322 L16.2928932,10.7071068 L12,6.41421356 Z"
      />
    </g>
  </svg>
);

export default Collapse;
