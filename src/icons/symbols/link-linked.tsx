import React from "react";

const LinkLinked = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M15.4142136,14 L20,14 L20,10 L15.4142136,10 L13.4142136,12 L15.4142136,14 Z M9.41421356,16 L2,16 L2,8 L9.41421356,8 L13.4142136,12 L9.41421356,16 Z M4,10 L4,14 L8.58578644,14 L10.5857864,12 L8.58578644,10 L4,10 Z M14.5857864,8 L22,8 L22,16 L14.5857864,16 L10.5857864,12 L14.5857864,8 Z"
        transform="rotate(-40 12 12)"
      />
    </g>
  </svg>
);

export default LinkLinked;
