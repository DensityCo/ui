import React from "react";

const Lobby = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M15,9 L12,9 L12,4 L20,4 L20,9 L17,9 L17,11 L22,11 L22,22 L2,22 L2,11 L4,11 L4,8 C4,7.44771525 4.44771525,7 5,7 L9,7 C9.55228475,7 10,7.44771525 10,8 L10,11 L15,11 L15,9 Z M20,13 L4,13 L4,20 L20,20 L20,13 Z M7,2 C8.1045695,2 9,2.8954305 9,4 C9,5.1045695 8.1045695,6 7,6 C5.8954305,6 5,5.1045695 5,4 C5,2.8954305 5.8954305,2 7,2 Z"
      />
    </g>
  </svg>
);

export default Lobby;
