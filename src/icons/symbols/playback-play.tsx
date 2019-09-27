import React from "react";

const PlaybackPlay = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon fill={color} fillRule="nonzero" points="8 20 8 4 18.667 12" />
    </g>
  </svg>
);

export default PlaybackPlay;
