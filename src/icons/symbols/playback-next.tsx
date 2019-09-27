import React from "react";

const PlaybackNext = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M7,6 L15,12 L7,18 L7,6 Z M17,6 L17,18 L15,18 L15,12 L15,6 L17,6 Z"
      />
    </g>
  </svg>
);

export default PlaybackNext;
