import React from "react";

const Chat = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M22,3 L22,16.9910312 L11.4113069,17.0864289 L7.40755736,21 L5,21 L5,17 L2,17 L2,3 L22,3 Z M20,5 L4,5 L4,15 L7,15 L7,18.6016223 L10.5886931,15.093759 L20,15.0089688 L20,5 Z M9,9 L9,11 L7,11 L7,9 L9,9 Z M13,9 L13,11 L11,11 L11,9 L13,9 Z M17,9 L17,11 L15,11 L15,9 L17,9 Z"
      />
    </g>
  </svg>
);

export default Chat;
