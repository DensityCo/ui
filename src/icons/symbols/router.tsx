import * as React from "react";

const Router = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        d="M13.4142 5.46447L12 4.05025C14.7337 1.31658 19.1658 1.31658 21.8995 4.05025L20.4853 5.46446C18.5327 3.51184 15.3668 3.51184 13.4142 5.46447Z"
        fill={color}
      />
      <path
        d="M16.9497 9.00001L14.9497 7C16.0543 5.89544 17.8452 5.89544 18.9497 7L16.9497 9.00001Z"
        fill={color}
      />
      <path d="M7 16H5V18H7V16Z" fill={color} />
      <path d="M8 16H10V18H8V16Z" fill={color} />
      <path d="M13 18V16H11V18H13Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 11H18V13H22V21H2V13H16V11ZM4 19V15H20V19H4Z"
        fill={color}
      />
    </svg>
  );


export default Router;

