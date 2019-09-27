import React from "react";

const BookmarkFill = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="5 2 19 2 19 22 12 19 5 22"
      />
    </g>
  </svg>
);

export default BookmarkFill;
