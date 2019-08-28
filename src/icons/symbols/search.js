import React from "react";

const Search = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M10,2 C14.418278,2 18,5.581722 18,10 C18,11.8482015 17.3732643,13.550021 16.3207287,14.9045228 L21.7071068,20.2928932 L20.2928932,21.7071068 L14.9045228,16.3207287 C13.550021,17.3732643 11.8482015,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z M10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 Z"
      />
    </g>
  </svg>
);

export default Search;