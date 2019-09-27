import React from "react";

const Phone = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M16,2 C17.1045695,2 18,2.8954305 18,4 L18,20 C18,21.1045695 17.1045695,22 16,22 L8,22 C6.8954305,22 6,21.1045695 6,20 L6,4 C6,2.8954305 6.8954305,2 8,2 L16,2 Z M16,4 L14.998,4 L14,5 L10,5 L9,4 L8,4 L8,20 L16,20 L16,4 Z"
      />
    </g>
  </svg>
);

export default Phone;
