import * as React from "react";

const NotificationsMultiple = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        d="M8 6.5C8 7.32843 7.32843 8 6.5 8C5.67157 8 5 7.32843 5 6.5C5 5.67157 5.67157 5 6.5 5C7.32843 5 8 5.67157 8 6.5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H4C2.89543 11 2 10.1046 2 9V4ZM4 4H20V9H4V4Z"
        fill={color}
      />
      <path
        d="M6.5 19C7.32843 19 8 18.3284 8 17.5C8 16.6716 7.32843 16 6.5 16C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 15C2 13.8954 2.89543 13 4 13H20C21.1046 13 22 13.8954 22 15V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V15ZM4 15H20V20H4V15Z"
        fill={color}
      />
    </svg>
  );


export default NotificationsMultiple;

