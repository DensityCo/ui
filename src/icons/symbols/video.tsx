import React from "react";

const Video = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,6 L18,8.333 L22,7 L22,17 L18,15.667 L18,18 L2,18 L2,6 L18,6 Z M16,8 L4,8 L4,16 L16,16 L16,15 L16,15 L16,9 L16,9 L16,8 Z M20,10 L18,11 L18,13.001 L20,14 L20,10 Z"
      />
    </g>
  </svg>
);

export default Video;
