import React from "react";

const Floorplans = ({color, width, height}) => <svg width={width || 20} height={height || 18} viewBox='0 0 20 18' xmlns='http://www.w3.org/2000/svg'>
<g id='Page-1' fill='none' fillRule='evenodd'>
    <g id='IconFloorplans' transform='translate(0 -1)'>
        <rect id='bounds' fillOpacity='0' fill={color} width='20' height='20'
        />
        <polygon id='Stroke-1' stroke={color} strokeWidth='1.5' strokeLinecap='square'
        strokeLinejoin='round' points='1 18 13 18 13 8 1 8' />
        <polyline id='Stroke-1-Copy' stroke={color} strokeWidth='1.5' strokeLinecap='square'
        strokeLinejoin='round' points='13 15 16 15 16 5 4 5 4 8' />
        <polyline id='Stroke-1-Copy-2' stroke={color} strokeWidth='1.5' strokeLinecap='square'
        strokeLinejoin='round' points='16 12 19 12 19 2 7 2 7 5' />
    </g>
</g>
</svg>;

export default Floorplans;
