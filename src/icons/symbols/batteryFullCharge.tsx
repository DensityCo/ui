import * as React from "react";

const BatteryFullCharge = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2L14 2V4L17 4C17.5523 4 18 4.44772 18 5L18 21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21L6 5C6 4.44772 6.44772 4 7 4L10 4V2ZM11 8L10 14L12 14L12 18H13L14 12H12L12 8H11Z"
        fill={color}
      />
    </svg>
  );


export default BatteryFullCharge;

