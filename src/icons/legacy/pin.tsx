import React from "react";

const Pin = ({color, width, height}) => <svg width={width || 12} height={height || 18} viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-541 -467)">
    <g id="iconPin" transform="translate(537 466)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <path d="M5,12 C5,10.1336294 6.15051465,8.37707426 6.42033106,7 C7.45162157,1.73655581 7.22581078,2 10,2 C12.7110391,2 12.4220782,2.20017432 13.5065529,7 C13.8221545,8.39683515 15,10.1966608 15,12 C11,13 8,12.5 5,12 Z"
        id="Path-13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M10,13 L10,18" id="Path-3" stroke={color} strokeWidth="1.5"
        fill="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>
</g>
</svg>;

export default Pin;
