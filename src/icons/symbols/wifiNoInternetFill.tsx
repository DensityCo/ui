import * as React from "react";

const WifiNoInternetFill = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1043 3.82265C17.4013 4.29493 19.9645 5.90846 21.6196 7.21516L22.3853 7.81963L12 21.6667L1.58588 7.78122L2.41876 7.18631C6.80996 4.04974 10.7741 3.34561 14.1043 3.82265ZM11 7H13V12H11V7ZM11 15V13H13V15H11Z"
        fill={color}
      />
    </svg>
  );


export default WifiNoInternetFill;

