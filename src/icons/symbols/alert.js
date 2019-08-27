import React from 'react';

const Alert = ({ width, height, color, accentColor }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M12,7 C15.7854517,7 18.8690987,10.0047834 18.995941,13.7593502 L19,14 L19,18 L21,18 L21,20 L13,20 L13,22 L11,22 L11,20 L3,20 L3,18 L5,18 L5,14 C5,10.2950898 7.87828051,7.26243804 11.520737,7.01614919 L11.7593502,7.00405902 L12,7 Z M12,9 C9.3112453,9 7.11818189,11.1223067 7.00461951,13.7831104 L7,14 L7,18 L17,18 L17,14 C17,11.3859329 14.9939616,9.24040122 12.4373428,9.01886276 L12.2168896,9.00461951 L12,9 Z M17.1339746,3.10769515 L18.8660254,4.10769515 L17.3660254,6.70577137 L15.6339746,5.70577137 L17.1339746,3.10769515 Z M6.8660254,3.10769515 L8.3660254,5.70577137 L6.6339746,6.70577137 L5.1339746,4.10769515 L6.8660254,3.10769515 Z M13,2 L13,5 L11,5 L11,2 L13,2 Z"
      />
    </g>
  </svg>
);

export default Alert;