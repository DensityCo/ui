import React from "react";

const PersonHuddle = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M15.9949073,16.8237272 L16,17 L16,22 L14,22 L14,17 C14,16.4871642 13.6139598,16.0644928 13.1166211,16.0067277 L13,16 L8,16 L5,16 C4.48716416,16 4.06449284,16.3860402 4.00672773,16.8833789 L4,17 L4,22 L2,22 L2,17 C2,15.4023191 3.24891996,14.0963391 4.82372721,14.0050927 L5,14 L13,14 L19,14 C20.5976809,14 21.9036609,15.24892 21.9949073,16.8237272 L22,17 L22,22 L20,22 L20,17 C20,16.4871642 19.6139598,16.0644928 19.1166211,16.0067277 L19,16 L18.8293257,16.0000889 C18.9212021,16.2600573 18.9782633,16.5364707 18.9949073,16.8237272 L19,17 L19,22 L17,22 L17,17 C17,16.4871642 16.6139598,16.0644928 16.1166211,16.0067277 L16,16 L15.8293257,16.0000889 C15.9212021,16.2600573 15.9782633,16.5364707 15.9949073,16.8237272 Z M15,2 C17.7614237,2 20,4.23857625 20,7 C20,9.76142375 17.7614237,12 15,12 C14.4776814,12 13.9740687,11.9199103 13.5007727,11.7713415 C13.0275209,11.9196573 12.523143,12 12,12 C11.4776648,12 10.9740367,11.9199052 10.5007275,11.7713273 C10.0275209,11.9196573 9.52314298,12 9,12 C6.23857625,12 4,9.76142375 4,7 C4,4.23857625 6.23857625,2 9,2 C9.53352427,2 10.0475314,2.08356302 10.5296472,2.23831502 C11.0033975,2.08716613 11.5032269,2 12,2 C12.523143,2 13.0275209,2.08034273 13.5014681,2.22936249 C13.9742453,2.08006165 14.4777729,2 15,2 Z M9,4 C7.34314575,4 6,5.34314575 6,7 C6,8.65685425 7.34314575,10 9,10 C10.6568542,10 12,8.65685425 12,7 C12,5.34314575 10.6568542,4 9,4 Z M13.1667493,4.23533799 L13.1742457,4.24660367 C13.6961489,5.03623493 14,5.98263336 14,7 C14,8.02215323 13.693283,8.97266887 13.1668648,9.76453126 C14.2440192,9.30947123 15,8.24302 15,7 C15,5.75698 14.2440192,4.69052877 13.1667493,4.23533799 Z M16.1667493,4.23533799 L16.1742457,4.24660367 C16.6961489,5.03623493 17,5.98263336 17,7 C17,8.02215323 16.693283,8.97266887 16.1668648,9.76453126 C17.2440192,9.30947123 18,8.24302 18,7 C18,5.75698 17.2440192,4.69052877 16.1667493,4.23533799 Z"
      />
    </g>
  </svg>
);

export default PersonHuddle;