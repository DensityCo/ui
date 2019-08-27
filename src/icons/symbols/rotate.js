import React from "react";

const Rotate = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M10,2 L10,9 L8,9 L8.000365,5.06937939 C5.56170978,6.47775793 4,9.09564893 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,9.80522787 19.1132416,7.75404913 17.5685034,6.25614434 C16.0851496,4.81776285 14.1082818,4 12,4 L12,2 C14.6333325,2 17.1079355,3.02365896 18.960784,4.8203328 C20.8900938,6.69114978 22,9.25849613 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,8.78512186 3.53128166,5.85072559 5.99875344,3.99891062 L3,4 L3,2 L10,2 Z"
        transform="rotate(90 12 12)"
      />
    </g>
  </svg>
);

export default Rotate;
