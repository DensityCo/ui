import React from "react";

const SoundOff = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M14,3 L14,21 L11.5857864,21 L6.58578644,16 L2,16 L2,8 L6.58578644,8 L11.5857864,3 L14,3 Z M12,5.41421356 L7.41421356,10 L4,10 L4,14 L7.41421356,14 L12,18.5857864 L12,5.41421356 Z M21.2928932,8.29289322 L22.7071068,9.70710678 L20.415,12 L22.7071068,14.2928932 L21.2928932,15.7071068 L19,13.415 L16.7071068,15.7071068 L15.2928932,14.2928932 L17.585,12 L15.2928932,9.70710678 L16.7071068,8.29289322 L19,10.585 L21.2928932,8.29289322 Z"
      />
    </g>
  </svg>
);

export default SoundOff;
