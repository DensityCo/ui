import React from "react";

const Info = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M13,11 L13,18 L11,18 L11,11 L13,11 Z M12,6 C12.8284271,6 13.5,6.67157288 13.5,7.5 C13.5,8.32842712 12.8284271,9 12,9 C11.1715729,9 10.5,8.32842712 10.5,7.5 C10.5,6.67157288 11.1715729,6 12,6 Z"
      />
    </g>
  </svg>
);

export default Info;
