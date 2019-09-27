import React from "react";

const EventSpace = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M9,3 L9,4 L15,4 L15,3 L17,3 L17,4 L22,4 L22,21 L2,21 L2,4 L7,4 L7,3 L9,3 Z M7,6 L4,6 L4,19 L20,19 L20,6 L17,6 L17,7 L15,7 L15,6 L9,6 L9,7 L7,7 L7,6 Z M16.2928932,9.29289322 L17.7071068,10.7071068 L11.0938363,17.3203772 L6.4,13.8 L7.6,12.2 L10.9061637,14.6796228 L16.2928932,9.29289322 Z"
      />
    </g>
  </svg>
);

export default EventSpace;
