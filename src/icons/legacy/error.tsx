import React from "react";

const Error = ({color, width, height}) => <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="Page-1" fill="none" fillRule="evenodd">
    <g id="IconError" transform="translate(-1 -1)">
        <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
        />
        <polygon id="Stroke-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" points="2 18 18 18 18 2 2 2" />
        <path d="M8.5,10.9219 L8.5,5.9219" id="Stroke-3" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" transform="rotate(-180 9.25 8.422)"
        />
        <path d="M10,14 L10,13.9219" id="Stroke-5" stroke={color} strokeWidth="1.5"
        strokeLinecap="square" strokeLinejoin="round" transform="rotate(-180 10 13.96)"
        />
    </g>
</g>
</svg>;

export default Error;
