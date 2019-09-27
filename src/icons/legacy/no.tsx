import React from "react";

const No = ({color, width, height}) => <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="Page-1" fill="none" fillRule="evenodd">
    <g id="IconNo" transform="translate(-1 -1)">
        <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
        />
        <path d="M5,15 L15,5" id="Stroke-1" stroke={color} strokeWidth="1.5" strokeLinecap="square"
        strokeLinejoin="round" />
        <path d="M18,10 C18,14.4182222 14.4183333,18 10,18 C5.58177778,18 2,14.4182222 2,10 C2,5.58166667 5.58177778,2 10,2 C14.4183333,2 18,5.58166667 18,10 L18,10 Z"
        id="Stroke-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
    </g>
</g>
</svg>;

export default No;
