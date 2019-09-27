import React from "react";

const Image = ({color, width, height}) => <svg width={width || '18'} height={height || '18'} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
  <g id='Page-1' fill='none' fillRule='evenodd'>
      <g id='IconImage' transform='translate(-1 -1)'>
          <rect id='bounds' fillOpacity='0' fill={color} width='20' height='20'
          />
          <polygon id='icon-square-copy' stroke={color} strokeWidth='1.5' strokeLinecap='round'
          strokeLinejoin='round' points='2 18 18 18 18 2 2 2' />
          <polyline id='Path-2' stroke={color} strokeWidth='1.5' points='1.99926758 18.0160522 6.0098877 11.0065918 9 14.0160522 13.0057373 6.97216797 18 18.0160522'
          />
          <circle id='Oval' stroke={color} strokeWidth='1.5' cx='6' cy='6' r='2'
          />
      </g>
  </g>
</svg>;

export default Image;