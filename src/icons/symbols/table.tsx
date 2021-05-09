import * as React from "react";

const Table = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 3H2L2 21H22V3ZM20 14V11H16V14H20ZM14 14V11H10V14H14ZM10 16H14V19H10V16ZM8 14V11H4V14H8ZM4 16H8V19H4V16ZM16 16H20V19H16V16ZM4 9H8V6H4V9ZM10 9H14V6H10V9ZM16 9H20V6H16V9Z"
        fill={color}
      />
    </svg>
  );


export default Table;

