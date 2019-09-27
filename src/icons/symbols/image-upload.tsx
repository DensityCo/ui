import React from "react";

const ImageUpload = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M7,8 L7,10 L4,10 L4,18.414 L7.80416953,13.6635054 L10.8714723,15.7248406 L15.1330024,11.4227275 L20,18.287 L20,10 L17,10 L17,8 L22,8 L22,22 L2,22 L2,8 L7,8 Z M14.8784722,14.5216084 L11.1285277,18.3072639 L8.21560586,16.3496782 L5.292,20 L18.763,20 L14.8784722,14.5216084 Z M12,1.75 L16.6,5.2 L15.4,6.8 L13,5.001 L13,10 L11,10 L11,4.999 L8.6,6.8 L7.4,5.2 L12,1.75 Z"
      />
    </g>
  </svg>
);

export default ImageUpload;
