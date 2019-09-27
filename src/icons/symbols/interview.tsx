import React from "react";

const Interview = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M5,19 L5,15 L2,15 L2,2 L18,2 L18,7 L22,7 L22,18.9704195 L19,19.0605135 L19,22 L16.5857864,22 L13.5857864,19 L6,19 L5,19 Z M18,14.9850971 L11.4137987,15.0839933 L9.452,17 L14.4142136,17 L17,19.5857864 L17,17.1196745 L20,17.0295805 L20,9 L18,9 L18,14.9850971 Z M16,4 L4,4 L4,13 L7,13 L7,16.6016223 L10.5862013,13.0961947 L16,13.0149029 L16,4 Z M12,9 L12,11 L6,11 L6,9 L12,9 Z M14,6 L14,8 L6,8 L6,6 L14,6 Z"
      />
    </g>
  </svg>
);

export default Interview;
