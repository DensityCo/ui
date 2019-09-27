import React from "react";

const CheckCircle = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M16.2407434,8.34920863 L17.7592566,9.65079137 L11.0564818,16.4706953 L7.29289322,12.7071068 L8.70710678,11.2928932 L10.9435182,13.5293047 L16.2407434,8.34920863 Z"
      />
    </g>
  </svg>
);

export default CheckCircle;
