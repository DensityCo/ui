import React from "react";

const StarOutline = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,17.7719334 L5.81966011,21.0211303 L7,14.1392207 L2,9.26542528 L8.90983006,8.2613682 L12,2 L15.0901699,8.2613682 L22,9.26542528 L17,14.1392207 L18.1803399,21.0211303 L12,17.7719334 Z M12,15.6618733 L15.6998155,17.6069814 L14.9932136,13.4871763 L17.9864272,10.5695141 L13.8499077,9.96844266 L12,6.22012016 L10.1500923,9.96844266 L6.01357278,10.5695141 L9.00678639,13.4871763 L8.30018451,17.6069814 L12,15.6618733 Z"
      />
    </g>
  </svg>
);

export default StarOutline;
