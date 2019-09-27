import React from "react";

const Dashboard = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M3,3 L21,3 L21,21 L3,21 L3,3 Z M5,5 L5,19 L19,19 L19,5 L5,5 Z M7,12 L9,12 L9,17 L7,17 L7,12 Z M11,8 L13,8 L13,17 L11,17 L11,8 Z M15,13 L17,13 L17,17 L15,17 L15,13 Z"
      />
    </g>
  </svg>
);

export default Dashboard;
