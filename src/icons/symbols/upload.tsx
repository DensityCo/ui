import React from "react";

const Upload = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20,20 L20,22 L4,22 L4,20 L20,20 Z M12,1.58578644 L19.7071068,9.29289322 L18.2928932,10.7071068 L13,5.41478644 L13,18 L11,18 L11,5.41278644 L5.70710678,10.7071068 L4.29289322,9.29289322 L12,1.58578644 Z"
      />
    </g>
  </svg>
);

export default Upload;
