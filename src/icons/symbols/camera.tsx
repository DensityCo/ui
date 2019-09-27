import React from "react";

const Camera = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M15.618034,3 L16.618034,5 L23,5 L23,21 L1,21 L1,5 L7.38196601,5 L8.38196601,3 L15.618034,3 Z M14.381966,5 L9.61803399,5 L8.61803399,7 L3,7 L3,19 L21,19 L21,7 L15.381966,7 L14.381966,5 Z M12,9 C14.209139,9 16,10.790861 16,13 C16,15.209139 14.209139,17 12,17 C9.790861,17 8,15.209139 8,13 C8,10.790861 9.790861,9 12,9 Z M12,11 C10.8954305,11 10,11.8954305 10,13 C10,14.1045695 10.8954305,15 12,15 C13.1045695,15 14,14.1045695 14,13 C14,11.8954305 13.1045695,11 12,11 Z"
      />
    </g>
  </svg>
);

export default Camera;
