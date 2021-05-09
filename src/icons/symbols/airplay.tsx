import * as React from "react";

const Airplay = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M22 4H2V17H6V15H4V6H20V15H18V17H22V4Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 11.1972L17.8685 20H6.13147L12 11.1972ZM9.8685 18H14.1315L12 14.8028L9.8685 18Z"
        fill={color}
      />
    </svg>
);

export default Airplay;

