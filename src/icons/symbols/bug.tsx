import * as React from "react";

const Bug = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 6H15C16.1046 6 17 6.89543 17 8H20V6H22V10H17V12H22V14H17V16H22V20H20V18H17V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V18H4V20H2V16H7V14H2V12H7V10H2V6H4V8H7C7 6.89543 7.89543 6 9 6H9.99999L8.20001 3.60002L9.80001 2.40002L12 5.33336L14.2 2.40002L15.8 3.60002L14 6ZM9 8H15V19H9V8Z"
        fill={color}
      />
    </svg>
  );


export default Bug;

