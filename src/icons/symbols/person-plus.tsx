import React from "react";

const PersonPlus = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M16,14 L16,16 L7,16 C6.44771525,16 6,16.4477153 6,17 L6,22 L4,22 L4,17 C4,15.3431458 5.34314575,14 7,14 L16,14 Z M20,16 L20,17.999 L22,18 L22,20 L20,19.999 L20,22 L18,22 L18,19.999 L16,20 L16,18 L18,17.999 L18,16 L20,16 Z M12,2 C14.7614237,2 17,4.23857625 17,7 C17,9.76142375 14.7614237,12 12,12 C9.23857625,12 7,9.76142375 7,7 C7,4.23857625 9.23857625,2 12,2 Z M12,4 C10.3431458,4 9,5.34314575 9,7 C9,8.65685425 10.3431458,10 12,10 C13.6568542,10 15,8.65685425 15,7 C15,5.34314575 13.6568542,4 12,4 Z"
      />
    </g>
  </svg>
);

export default PersonPlus;
