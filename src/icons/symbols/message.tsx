import React from "react";

const Message = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M21,6 L21,18 L3,18 L3,6 L21,6 Z M19,8.999 L12,14.25 L5,9.001 L5,16 L19,16 L19,8.999 Z M16.999,8 L6.999,8 L12,11.75 L16.999,8 Z"
      />
    </g>
  </svg>
);

export default Message;
