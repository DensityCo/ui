import React from "react";

const LinkBroken = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M14.0989462,5.56629275 L15.9010538,6.43370725 L10.1250538,18.4337072 L8.32294616,17.5662928 L14.0989462,5.56629275 Z M22,8 L22,16 L14,16 L14,14 L20,14 L20,10 L17,10 L17,8 L22,8 Z M10,8 L10,10 L4,10 L4,14 L7,14 L7,16 L2,16 L2,8 L10,8 Z"
        transform="rotate(-40 12 12)"
      />
    </g>
  </svg>
);

export default LinkBroken;
