import React from "react";

const Space = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 6L12 2L2 6.5L2 17.5L12 22L22 17.5L22 6ZM18.1757 6.62435L12.046 4.17247L5.8473 6.96189L11.977 9.41377L18.1757 6.62435ZM11 11.177L4 8.37703L4 16.2068L11 19.3568L11 11.177ZM13 11.1466L13 19.3568L20 16.2068L20 7.99659L13 11.1466Z"
      fill={color}
    />
  </svg>
);

export default Space;