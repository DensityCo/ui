import * as React from "react";

const Keyboard = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M7 8H5V10H7V8Z" fill={color} />
      <path d="M5 11H7V13H5V11Z" fill={color} />
      <path d="M10 8H8V10H10V8Z" fill={color} />
      <path d="M8 11H10V13H8V11Z" fill={color} />
      <path d="M16 14H8V16H16V14Z" fill={color} />
      <path d="M11 8H13V10H11V8Z" fill={color} />
      <path d="M13 11H11V13H13V11Z" fill={color} />
      <path d="M14 8H16V10H14V8Z" fill={color} />
      <path d="M16 11H14V13H16V11Z" fill={color} />
      <path d="M17 8H19V10H17V8Z" fill={color} />
      <path d="M19 11H17V13H19V11Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 19V5H22V19H2ZM4 7H20V17H4V7Z"
        fill={color}
      />
    </svg>
  );


export default Keyboard;

