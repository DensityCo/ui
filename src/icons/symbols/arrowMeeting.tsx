import * as React from "react";

const ArrowMeeting = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.41421 7L11.1213 11.7071L6.41421 16.4142L5 15L7.353 12.646L2 12.6464L2 10.6464L7.231 10.646L5 8.41421L6.41421 7ZM17.5871 7L19.0013 8.41421L16.77 10.646L22 10.6464V12.6464L16.648 12.646L19.0013 15L17.5871 16.4142L12.88 11.7071L17.5871 7Z"
        fill={color}
      />
    </svg>
  );

export default ArrowMeeting;

