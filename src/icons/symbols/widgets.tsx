import * as React from "react";

const Widgets = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3431 7L17 1.34315L22.6569 7L17 12.6569L11.3431 7ZM17 4.17157L19.8284 7L17 9.82843L14.1716 7L17 4.17157Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 11V3H11V11H3ZM5 5H9V9H5V5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 21V13H11V21H3ZM5 15H9V19H5V15Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 13V21H21V13H13ZM19 19V15H15V19H19Z"
        fill={color}
      />
    </svg>
  );


export default Widgets;

