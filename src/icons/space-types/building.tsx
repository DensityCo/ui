import * as React from "react";

const Building = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 2L21 21L3 21L3 2.38197L11 6.382V2L21 2ZM19 4L13 4L13 9.61803L5 5.618L5 19L15 19L15 15H17L17 19H19L19 4ZM9 15L9 17H7L7 15L9 15ZM13 15V17H11V15H13ZM13 11V13H11V11H13ZM9 11V13L7 13V11L9 11ZM17 11V13H15V11H17ZM17 7V9L15 9L15 7L17 7Z"
        fill={color}
      />
    </svg>
  );


export default Building;

