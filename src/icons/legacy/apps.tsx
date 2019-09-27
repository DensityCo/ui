import React from "react";

const Apps = ({color, width, height}) => <svg width={width || 18} height={height || 18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-486 -519)">
    <g id="iconApps" transform="translate(485 518)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <path d="M2,8 L8,8 L8,16.9991283 C8,17.5553691 7.55641359,18 7.00922203,18 L2.99077797,18 C2.45097518,18 2,17.5518945 2,16.9991283 L2,8 Z M2.99077797,2 L7.00922203,2 L2.99077797,2 Z"
        id="Combined-Shape" stroke={color} strokeWidth="1.5" fill="#FAFAFA" strokeLinecap="round"
        strokeLinejoin="round" />
      <path d="M2,8 L16.9991283,8 C17.5518945,8 18,7.54902482 18,7.00922203 L18,2.99077797 C18,2.44358641 17.5553691,2 16.9991283,2 L3.00087166,2 C2.4481055,2 2,2.45097518 2,2.99077797 L2,8 Z"
        id="icon-square-copy-2" stroke={color} strokeWidth="1.5" fill="#FAFAFA"
        strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>
</g>
</svg>;

export default Apps;
