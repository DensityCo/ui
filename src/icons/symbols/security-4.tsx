import React from "react";

const Security4 = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,1.94590745 L22.2136693,5.35046389 L18.8662448,17.6243539 L12,22.2018504 L5.13375522,17.6243539 L1.78633067,5.35046389 L12,1.94590745 Z M12,4.05409255 L4.21366933,6.64953611 L6.86624478,16.3756461 L12,19.7981496 L17.1337552,16.3756461 L19.7863307,6.64953611 L12,4.05409255 Z M16.2317787,7.3598156 L17.7682213,8.6401844 L12.1600256,15.3700192 L7.4,11.8 L8.6,10.2 L11.8399744,12.6299808 L16.2317787,7.3598156 Z"
      />
    </g>
  </svg>
);

export default Security4;
