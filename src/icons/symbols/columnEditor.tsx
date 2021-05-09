import * as React from "react";

const ColumnEditor = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2H22V22H2L2 2ZM14 6H10V20H14V6ZM4 6H8V20H4V6ZM16 6H20V20H16V6Z"
        fill={color}
      />
    </svg>
  );

export default ColumnEditor;

