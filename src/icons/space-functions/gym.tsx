import React from "react";

const Gym = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M19,18 L17,18 L17,13 L7,13 L7,18 L5,18 L5,16 L3,16 L3,13 L2,13 L2,11 L3,11 L3,8 L5,8 L5,6 L7,6 L7,11 L17,11 L17,6 L19,6 L19,8 L21,8 L21,11 L22,11 L22,13 L21,13 L21,16 L19,16 L19,18 Z"
      />
    </g>
  </svg>
);

export default Gym;
