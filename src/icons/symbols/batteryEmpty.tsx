import * as React from "react";

const BatteryEmpty = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2H10V4H7C6.44772 4 6 4.44772 6 5V21C6 21.5523 6.44772 22 7 22H17C17.5523 22 18 21.5523 18 21V5C18 4.44772 17.5523 4 17 4H14V2ZM8 20V6H16V20H8Z"
        fill={color}
      />
    </svg>
  );


export default BatteryEmpty;

