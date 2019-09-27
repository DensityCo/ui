import React from "react";

const Trash = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M2.25,4 L7.10542736e-15,4 L7.10542736e-15,2 L6,2 L6,0 L12,0 L12,2 L18,2 L18,4 L15.75,4 L14,18 L4,18 L2.25,4 Z M4.26556444,4 L5.76556444,16 L12.2344356,16 L13.7344356,4 L4.26556444,4 Z"
        transform="translate(3 3)"
      />
    </g>
  </svg>
);

export default Trash;
