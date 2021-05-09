import * as React from "react";

const Tag = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.17108 10.8279L12.8995 18.5563L18.5563 12.8995L10.8279 5.17108L6.11389 6.11389L5.17108 10.8279ZM3 11.4853L12.8995 21.3848L21.3848 12.8995L11.4853 3L4.41421 4.41421L3 11.4853Z"
        fill={color}
      />
    </svg>
  );


export default Tag;

