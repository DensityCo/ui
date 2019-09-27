import React from "react";

const LightningFill = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <polygon
        fill={color}
        fillRule="nonzero"
        points="13.861 9.222 20 9.222 20 11.393 10.709 20.778 8.539 20.778 10.139 14.556 4 14.556 4 12.359 13.291 3 15.461 3"
      />
    </g>
  </svg>
);

export default LightningFill;
