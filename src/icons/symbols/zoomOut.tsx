import * as React from "react";

const ZoomOut = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path d="M14 11V9L8 9V11H14Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10C3 14.4183 6.58172 18 11 18C12.8487 18 14.551 17.3729 15.9056 16.3199L21.2929 21.7071L22.7071 20.2929L17.3199 14.9056C18.3729 13.551 19 11.8487 19 10C19 5.58172 15.4183 2 11 2C6.58172 2 3 5.58172 3 10ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z"
        fill={color}
      />
    </svg>
);

export default ZoomOut;

