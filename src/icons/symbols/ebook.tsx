import React from "react";

const Ebook = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M21,3 L21,15 L22,20 L2,20 L3,15 L3,3 L21,3 Z M19,5 L17,5 L17,11 L15,10 L13,11 L13,5 L5,5 L5,14 L19,14 L19,5 Z"
      />
    </g>
  </svg>
);

export default Ebook;
