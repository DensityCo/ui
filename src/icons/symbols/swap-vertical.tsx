import React from "react";

const SwapVertical = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M8.29289322,12.2928932 L9.70710678,13.7071068 L7.41378644,15.9998932 L18,16 L18,18 L7.41378644,17.9998932 L9.70710678,20.2928932 L8.29289322,21.7071068 L3.58578644,17 L8.29289322,12.2928932 Z M15.7071068,2.29289322 L20.4142136,7 L15.7071068,11.7071068 L14.2928932,10.2928932 L16.5857864,7.99989322 L6,8 L6,6 L16.5857864,5.99989322 L14.2928932,3.70710678 L15.7071068,2.29289322 Z"
        transform="rotate(90 12 12)"
      />
    </g>
  </svg>
);

export default SwapVertical;
