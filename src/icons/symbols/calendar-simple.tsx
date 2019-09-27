import React from "react";

const CalendarSimple = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M21,4 L21,20 L3,20 L3,4 L21,4 Z M19,10 L5,10 L5,18 L19,18 L19,10 Z M19,6 L5,6 L5,8 L19,8 L19,6 Z"
      />
    </g>
  </svg>
);

export default CalendarSimple;
