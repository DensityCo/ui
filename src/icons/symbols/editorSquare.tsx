import * as React from "react";

const editorSquare = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2L8 2V4L16 4V2L22 2V8L20 8L20 16H22V22H16V20L8 20V22H2L2 16H4L4 8H2L2 2ZM6 8L6 16L8 16V18H16V16H18L18 8H16V6L8 6V8H6ZM6 4L6 6H4V4L6 4ZM20 6V4H18V6L20 6ZM18 20H20V18L18 18V20ZM4 18L4 20H6V18H4Z"
        fill={color}
      />
    </svg>
  );

export default editorSquare;

