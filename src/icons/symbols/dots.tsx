import React from "react";

const Dots = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 40 40">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenoldd"
        d="M14 18C12.9 18 12 18.9 12 20C12 21.1 12.9 22 14 22C15.1 22 16 21.1 16 20C16 18.9 15.1 18 14 18ZM26 18C24.9 18 24 18.9 24 20C24 21.1 24.9 22 26 22C27.1 22 28 21.1 28 20C28 18.9 27.1 18 26 18ZM18 20C18 18.9 18.9 18 20 18C21.1 18 22 18.9 22 20C22 21.1 21.1 22 20 22C18.9 22 18 21.1 18 20Z"
      />
    </g>
  </svg>
);

export default Dots;
