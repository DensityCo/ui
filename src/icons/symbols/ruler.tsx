import * as React from "react";

const Ruler = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 18V6H22V18H2ZM8 8H11V11H13V8H16V11H18V8H20V16H4V8H6V11H8V8Z"
      fill={color}
    />
  </svg>
);

export default Ruler;

