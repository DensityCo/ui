import React from "react";

const Alert = ({ width, height, color, accentColor }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <rect width="18" height="2" x="3" y="18" fill={color} fillRule="nonzero"/>
      <rect width="2" height="2" x="11" y="20" fill={color} fillRule="nonzero"/>
      <path
        fill={color}
        fillRule="nonzero"
        d="M19,20 L19,14 C19,10.1340068 15.8659932,7 12,7 C8.13400675,7 5,10.1340068 5,14 L5,20 L7,20 L7,14 C7,11.2385763 9.23857625,9 12,9 C14.7614237,9 17,11.2385763 17,14 L17,20 L19,20 Z"
      />
      <g fill={accentColor || color} fillRule="nonzero" transform="translate(4.75 2)">
        <polygon points="13.5 4.407 13.5 1.407 11.5 1.407 11.5 4.407" transform="rotate(30 12.5 2.907)"/>
        <polygon points="3 4.407 3 1.407 1 1.407 1 4.407" transform="rotate(-30 2 2.907)"/>
        <polygon points="8.25 3 8.25 0 6.25 0 6.25 3"/>
      </g>
    </g>
  </svg>
);

export default Alert;
