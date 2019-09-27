import React from "react";

const DashboardAdd = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M17,5 L17,3 L19,3 L19,5 L21,5 L21,7 L19,7 L19,9 L17,9 L17,7 L15,7 L15,5 L17,5 Z M7,12 L9,12 L9,17 L7,17 L7,12 Z M11,8 L13,8 L13,17 L11,17 L11,8 Z M15,13 L17,13 L17,17 L15,17 L15,13 Z M21,13 L21,21 L3,21 L3,3 L12,3 L12,5 L5,5 L5,19 L19,19 L19,13 L21,13 Z"
      />
    </g>
  </svg>
);

export default DashboardAdd;
