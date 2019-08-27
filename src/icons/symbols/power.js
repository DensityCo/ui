import React from "react";

const Power = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M9.00011922,2.45776484 L9.0000295,4.58150511 C6.06818353,5.76827252 4,8.64261119 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,8.64299184 17.9322854,5.76892431 15.0009677,4.58190884 L15.0008825,2.45807951 C19.0575337,3.7326156 22,7.52268289 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,7.52231435 4.9429507,3.73199167 9.00011922,2.45776484 Z M13,2 L13,10 L11,10 L11,2 L13,2 Z"
      />
    </g>
  </svg>
);

export default Power;
