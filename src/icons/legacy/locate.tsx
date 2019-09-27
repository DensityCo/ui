import React from "react";

const Locate = ({color, width, height}) => <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="Page-1" fill="none" fillRule="evenodd">
    <g id="IconLocate" transform="translate(-1 -1)">
        <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
        />
        <path d="M10,16 C6.68633333,16 4,13.3136667 4,10 C4,6.68625 6.68633333,4 10,4 C13.31375,4 16,6.68625 16,10 C16,13.3136667 13.31375,16 10,16 Z"
        id="icon_circle" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" />
        <path d="M1,10 L4,10" id="Path-8" stroke={color} strokeWidth="1.5" />
        <path d="M16,10 L19,10" id="Path-8-Copy-3" stroke={color} strokeWidth="1.5"
        />
        <path d="M10,19 L10,16" id="Path-8-Copy" stroke={color} strokeWidth="1.5"
        />
        <path d="M10,4 L10,1" id="Path-8-Copy-2" stroke={color} strokeWidth="1.5"
        />
    </g>
</g>
</svg>;

export default Locate;
