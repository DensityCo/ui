import * as React from "react";

const Copy = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 18V2H22V18H6ZM8 4H20V16H8V4Z"
        fill={color}
      />
      <path d="M4 6H2V22H18V20H4V6Z" fill={color} />
    </svg>
  );


export default Copy;

