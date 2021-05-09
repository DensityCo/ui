import * as React from "react";

const ThermometerTemperatureThermostat = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 12.9996C16.2144 13.9118 17 15.3642 17 17C17 19.7614 14.7614 22 12 22C9.23858 22 7 19.7614 7 17C7 15.3642 7.78555 13.9118 9 12.9996V2H15V12.9996ZM13 4H11V11H13V10H12V8H13V7H12V5H13V4Z"
        fill={color}
      />
    </svg>
  );


export default ThermometerTemperatureThermostat;

