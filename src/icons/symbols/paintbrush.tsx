import React from "react";

const Paintbrush = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M13,1 C14.1045695,1 15,1.8954305 15,3 L15,8 L19,8 C20.1045695,8 21,8.8954305 21,10 L21,14 L19,14 L19,23 L9,23 L9,21 L7,23 L5,23 L5,14 L3,14 L3,10 C3,8.8954305 3.8954305,8 5,8 L9,8 L9,3 C9,1.8954305 9.8954305,1 11,1 L13,1 Z M17,14 L7,14 L7,20.2970784 L11,16.6607148 L11,21 L17,21 L17,14 Z M19,10 L5,10 L5,12 L19,12 L19,10 Z M13,3 L11,3 L11,8 L13,8 L13,3 Z"
      />
    </g>
  </svg>
);

export default Paintbrush;
