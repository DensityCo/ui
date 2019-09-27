import React from "react";

const Filters = ({color, width, height}) => <svg width={width || 18} height={height || 14} viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-330 -521)">
    <g id="IconFilters" transform="translate(329 518)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <path d="M18,10 L2,10" id="Stroke-3" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
      <path d="M18,5 L2,5" id="Stroke-3-Copy" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5,6 L5,4" id="Stroke-3-Copy" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
      <path d="M15,11 L15,9" id="Stroke-3-Copy" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
      <path d="M8,16 L8,14" id="Stroke-3-Copy" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
      <path d="M18,15 L2,15" id="Stroke-3-Copy-2" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" />
    </g>
  </g>
</g>
</svg>;

export default Filters;