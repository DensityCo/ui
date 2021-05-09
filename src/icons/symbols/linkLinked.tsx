import * as React from "react";

const LinkLinked = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M2 6H11V8H4V15.9997L11 16V18H2V6Z" fill={color} />
      <path
        d="M22 18L13 18V16L20 16V8.00028L13 8.00001V6.00001L22 6.00001L22 18Z"
        fill={color}
      />
      <path d="M8 13L16 13V11L8 11V13Z" fill={color} />
    </svg>
  );


export default LinkLinked;

