import * as React from "react";

const LockOpen = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M10 15V17H14V15H10Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8C6 4.68629 8.68629 2 12 2C14.6124 2 16.8349 3.66962 17.6586 6H15.4649C14.7733 4.8044 13.4806 4 12 4C9.79086 4 8 5.79086 8 8V10H21V22H3V10H6V8ZM5 12V20H19V12H5Z"
        fill={color}
      />
    </svg>
);

export default LockOpen;

