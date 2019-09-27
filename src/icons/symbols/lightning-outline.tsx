import React from "react";

const LightningOutline = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M13.860584,9.22222222 L20,9.22222222 L20,11.3932177 L10.7092855,20.7777778 L8.53941601,20.7777778 L10.139416,14.5555556 L4,14.5555556 L4,12.3590832 L13.2913521,3 L15.460584,3 L13.860584,9.22222222 Z M18.0107145,11 L11.739416,11 L13.1404357,5.55159001 L5.96654343,12.7777778 L12.260584,12.7777778 L10.8605382,18.2224003 L18.0107145,11 Z"
      />
    </g>
  </svg>
);

export default LightningOutline;
