import * as React from "react";

const LinkBroken = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        d="M15.9363 4.35113L9.93632 20.3511L8.06366 19.6489L14.0637 3.64888L15.9363 4.35113Z"
        fill={color}
      />
      <path d="M2 6H10V8H4V15.9997L7 16V18H2V6Z" fill={color} />
      <path
        d="M14 18L22 18L22 6.00001L17 6.00001V8.00001L20 8.00028V16L14 16V18Z"
        fill={color}
      />
    </svg>
  );


export default LinkBroken;

