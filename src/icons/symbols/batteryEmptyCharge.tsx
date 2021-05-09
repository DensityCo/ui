import * as React from "react";

const BatteryEmptyCharge = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M11 8L10 14H12V18H13L14 12H12V8H11Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2H14V4H17C17.5523 4 18 4.44772 18 5V21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21V5C6 4.44772 6.44772 4 7 4H10V2ZM8 6V20H16V6H8Z"
        fill={color}
      />
    </svg>
  );


export default BatteryEmptyCharge;

