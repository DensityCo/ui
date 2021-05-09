import * as React from "react";

const Campus = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2L17 4L13 5.333V7L17 7V12L22 12L22 22L2 22L2 12H7L7 7L11 7V2ZM7 14H4L4 20H7L7 14ZM15 9L9 9L9 20L15 20L15 9ZM20 14L17 14L17 20H20V14Z"
        fill={color}
      />
    </svg>
  );


export default Campus;

