import React from "react";

const BookmarkOutline = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M17,4 L7,4 L7,18.966922 L12,16.8240648 L17,18.966922 L17,4 Z M5,2 L19,2 L19,22 L12,19 L5,22 L5,2 Z"
      />
    </g>
  </svg>
);

export default BookmarkOutline;
