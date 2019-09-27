import React from "react";

const Folder = ({color, width, height}) => <svg width='18' height='17' viewBox='0 0 18 17' xmlns='http://www.w3.org/2000/svg'>
  <g id='1' fill='none' fillRule='evenodd'>
      <g id='icons' transform='translate(-331 -571)'>
          <g id='IconFolder' transform='translate(330 570)'>
              <rect id='bounds' fillOpacity='0' fill='#E3E3E6' width='20' height='20'
              />
              <polygon id='Stroke-3' stroke={color} strokeWidth='1.5' strokeLinecap='round'
              strokeLinejoin='round' points='2 17 18 17 18 3.875 10 3.875 8 2 2 2 2 3.875'
              />
              <rect id='Rectangle' stroke={color} strokeWidth='1.5' strokeLinecap='round'
              strokeLinejoin='round' x='2' y='7' width='16' height='10' />
          </g>
      </g>
  </g>
</svg>;

export default Folder;
