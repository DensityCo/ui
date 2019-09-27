import React from "react";

const Notification = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M17,12 C14.2385763,12 12,9.76142375 12,7 C12,4.23857625 14.2385763,2 17,2 C19.7614237,2 22,4.23857625 22,7 C22,9.76142375 19.7614237,12 17,12 Z M17,10 C18.6568542,10 20,8.65685425 20,7 C20,5.34314575 18.6568542,4 17,4 C15.3431458,4 14,5.34314575 14,7 C14,8.65685425 15.3431458,10 17,10 Z M21,14 L21,21 L3,21 L3,3 L10,3 L10,5 L5,5 L5,19 L19,19 L19,14 L21,14 Z"
      />
    </g>
  </svg>
);

export default Notification;
