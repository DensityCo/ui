import * as React from "react";

const ArrowDeparting = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.12132 15.3536L6.70711 16.7678L2 12.0607L6.70711 7.35358L8.12132 8.76779L5.89 10.9996L18.111 10.9996L15.88 8.76779L17.2942 7.35358L22.0013 12.0607L17.2942 16.7678L15.88 15.3536L18.233 12.9996L5.768 12.9996L8.12132 15.3536Z"
        fill={color}
      />
    </svg>
  );

export default ArrowDeparting;

