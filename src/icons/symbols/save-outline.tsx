import React from "react";

const SaveOutline = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18,2 L22,6 L22,22 L2,22 L2,2 L18,2 Z M17.1715729,4 L4,4 L4,20 L20,20 L20,6.82842712 L17.1715729,4 Z M12,10 C14.209139,10 16,11.790861 16,14 C16,16.209139 14.209139,18 12,18 C9.790861,18 8,16.209139 8,14 C8,11.790861 9.790861,10 12,10 Z M12,12 C10.8954305,12 10,12.8954305 10,14 C10,15.1045695 10.8954305,16 12,16 C13.1045695,16 14,15.1045695 14,14 C14,12.8954305 13.1045695,12 12,12 Z M14,6 L14,8 L6,8 L6,6 L14,6 Z"
      />
    </g>
  </svg>
);

export default SaveOutline;
