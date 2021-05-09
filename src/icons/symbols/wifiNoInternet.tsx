import * as React from "react";

const WifiNoInternet = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M11 7H13V12H11V7Z" fill={color} />
      <path d="M13 15V13H11V15H13Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1043 3.82265C17.4013 4.29493 19.9645 5.90846 21.6196 7.21516L22.3853 7.81963L12 21.6667L1.58588 7.78122L2.41876 7.18631C6.80996 4.04974 10.7741 3.34561 14.1043 3.82265ZM4.42809 8.2375L12 18.3334L19.5989 8.20152C18.1376 7.17274 16.1818 6.14066 13.8207 5.80244C11.2401 5.43278 8.07772 5.87747 4.42809 8.2375Z"
        fill={color}
      />
    </svg>
  );


export default WifiNoInternet;

