import React from "react";

const Check = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="9.77 15.766 19.26 5.327 20.74 6.673 9.866 18.634 3.307 12.32 4.693 10.88"
      />
    </g>
  </svg>
);

export default Check;
