import * as React from "react";

const LockClosed = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M13 14V18H11V14H13Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.68629 2 6 4.68629 6 8V10H3V22H21V10H18V8C18 4.68629 15.3137 2 12 2ZM16 10V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V10H16ZM5 20V12H19V20H5Z"
        fill={color}
      />
    </svg>
);

export default LockClosed;

