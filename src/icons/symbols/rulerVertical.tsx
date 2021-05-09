import * as React from "react";

const RulerVertical = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2L18 2L18 22H6L6 2ZM16 8V11H13V13H16V16H13L13 18H16V20H8L8 4L16 4V6H13V8H16Z"
        fill={color}
      />
    </svg>
  );

export default RulerVertical;

