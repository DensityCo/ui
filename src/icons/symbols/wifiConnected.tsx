import * as React from "react";

const WifiConnected = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        d="M21.6196 7.21516C19.9645 5.90846 17.4013 4.29493 14.1043 3.82265C10.7741 3.34561 6.80996 4.04974 2.41876 7.18631L1.58588 7.78122L12 21.6667L22.3853 7.81963L21.6196 7.21516Z"
        fill={color}
      />
    </svg>
  );


export default WifiConnected;

