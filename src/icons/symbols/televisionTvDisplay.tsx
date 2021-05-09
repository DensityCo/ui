import * as React from "react";

const TelevisionTvDisplay = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 17V4H22V17H2ZM4 6H20V15H4V6Z"
        fill={color}
      />
      <path d="M16 18H8V20H16V18Z" fill={color} />
    </svg>
  );


export default TelevisionTvDisplay;

