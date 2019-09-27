import React from "react";

const CloseBox = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M2,2 L22,2 L22,22 L2,22 L2,2 Z M4,4 L4,20 L20,20 L20,4 L4,4 Z M12,10.5714286 L15.5714286,7 L17,8.42857143 L13.4285714,12 L17,15.5714286 L15.5714286,17 L12,13.4285714 L8.42857143,17 L7,15.5714286 L10.5714286,12 L7,8.42857143 L8.42857143,7 L12,10.5714286 Z"
      />
    </g>
  </svg>
);

export default CloseBox;
