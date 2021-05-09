import * as React from "react";

const TagFill = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        d="M12.8995 21.3848L3.00003 11.4853L4.41424 4.41421L11.4853 3L21.3848 12.8995L12.8995 21.3848Z"
        fill={color}
      />
    </svg>
  );


export default TagFill;

