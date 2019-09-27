import React from "react";

const Square = ({color, width, height}) => <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="Page-1" fill="none" fillRule="evenodd">
    <g id="IconSquare" transform="translate(-1 -1)">
        <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
        />
        <polygon id="icon-square" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round" points="2 18 18 18 18 2 2 2" />
    </g>
</g>
</svg>;

export default Square;
