import React from "react";

const Expand = ({color, width, height}) => <svg width={width || 18} height={height || 18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-122 -519)">
    <g id="IconExpand" transform="translate(121 518)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <polyline id="Stroke-3" stroke={color} strokeWidth="1.5" strokeLinecap="square"
        strokeLinejoin="round" points="13 2 18 2 18 7" />
      <path d="M18,2 L11,9" id="Stroke-5" stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" />
      <polyline id="Stroke-3-Copy-3" stroke={color} strokeWidth="1.5" strokeLinecap="square"
        strokeLinejoin="round" points="2 13 2 18 7 18" />
      <path d="M9,11 L2,18" id="Stroke-5-Copy" stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" />
    </g>
  </g>
</g>
</svg>;

export default Expand;
