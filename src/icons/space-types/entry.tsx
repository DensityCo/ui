import * as React from "react";

const Entry = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 3L19 21L6 21L6 15H8L8 19H17V5L8 5V9H6L6 3L19 3ZM10.7071 7.29289L15.4142 12L10.7071 16.7071L9.29289 15.2929L11.585 13L3 13L3 11L11.585 11L9.29289 8.70711L10.7071 7.29289Z"
        fill={color}
      />
    </svg>
  );


export default Entry;

