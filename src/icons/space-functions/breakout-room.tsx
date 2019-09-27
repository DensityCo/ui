import React from "react";

const BreakoutRoom = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M2,16 L2,14 L3,14 L3,2 L21,2 L21,14 L22,14 L22,16 L21,16 L15,16 L18,22 L16,22 L13,16 L13,22 L11,22 L11,16 L8,22 L6,22 L9,16 L3,16 L2,16 Z M19,4 L5,4 L5,14 L19,14 L19,4 Z M14,10 L14,12 L7,12 L7,10 L14,10 Z M17,6 L17,8 L7,8 L7,6 L17,6 Z"
      />
    </g>
  </svg>
);

export default BreakoutRoom;
