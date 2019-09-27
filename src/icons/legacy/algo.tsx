import React from "react";

const Algo = ({color, width, height}) => <svg width={width || 20} height={height || 18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-174 -571)">
    <g id="IconAlgo" transform="translate(174 570)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <path d="M15.114355,3.8480373 C13.7277936,2.69406988 11.9449512,2 10,2 C6.42497389,2 3.39765363,4.34500749 2.37231626,7.58074541"
        id="Oval" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"
      />
      <path d="M17.6731057,14.155095 C16.3053075,13.0627961 14.5712963,12.4097981 12.6847693,12.4097981 C9.10626145,12.4097981 6.07652677,14.7593754 5.05409551,18"
        id="Oval" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"
        transform="rotate(180 11.364 15.205)" />
      <circle id="Oval" stroke={color} strokeWidth="1.5" strokeLinecap="square"
        strokeLinejoin="round" cx="17" cy="6" r="2" />
      <circle id="Oval" stroke={color} strokeWidth="1.5" strokeLinecap="square"
        strokeLinejoin="round" cx="3" cy="15" r="2" />
      <rect id="Rectangle" fill={color} x="7" y="7" width="6" height="6" rx="3"
      />
    </g>
  </g>
</g>
</svg>;

export default Algo;
