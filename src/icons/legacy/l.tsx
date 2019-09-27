import React from "react";

const L = ({color, width, height}) => <svg width={width || '6'} height={height || '8'} viewBox='0 0 6 8' xmlns='http://www.w3.org/2000/svg'>
  <g id='1' fill='none' fillRule='evenodd'>
      <g id='icons' transform='translate(-389 -576)'>
          <g id='IconL' transform='translate(382 570)'>
              <rect id='bounds' fillOpacity='0' fill='#E3E3E6' width='20' height='20'
              />
              <polyline id='Path-10' stroke={color} strokeWidth='1.5' points='8 6 8 13 13 13'
              />
          </g>
        </g>
    </g>
</svg>;

export default L;
