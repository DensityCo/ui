import React from "react";

const IngressUp = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,5.58578644 L19.7071068,13.2928932 L18.2928932,14.7071068 L13,9.414 L13,22 L11,22 L11,9.414 L5.70710678,14.7071068 L4.29289322,13.2928932 L12,5.58578644 Z M20,2 L20,4 L4,4 L4,2 L20,2 Z"
      />
    </g>
  </svg>
);

export default IngressUp;
