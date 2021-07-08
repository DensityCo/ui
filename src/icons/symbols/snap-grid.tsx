import React from "react";

const SnapGrid = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="evenodd"
        d="M17 5h-2V3h2v2zm-2 4h2V7h-2v2zm2 4h-2v-2h2v2zm-2 4h2v-2h-2v2zm0 4h2v-2h-2v2zM19 17v-2h2v2h-2zm-8-2v2h2v-2h-2zm-4 2v-2h2v2H7zm-4 0v-2h2v2H3z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export default SnapGrid;
