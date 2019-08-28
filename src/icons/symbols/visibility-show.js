import React from "react";

const VisibilityShow = ({ width, height, color }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <rect width={24} height={24} />
      <path
        fill={color}
        fillRule="nonzero"
        d="M18.363961,7.94974747 L22.4142136,12 L18.363961,16.0502525 C14.8492424,19.5649712 9.1507576,19.5649712 5.63603897,16.0502525 L1.58578644,12 L5.63603897,7.94974747 C9.1507576,4.43502884 14.8492424,4.43502884 18.363961,7.94974747 Z M7.05025253,9.36396103 L4.41421356,12 L7.05025253,14.636039 C9.78392257,17.369709 14.2160774,17.369709 16.9497475,14.636039 L19.5857864,12 L16.9497475,9.36396103 C14.2160774,6.63029099 9.78392257,6.63029099 7.05025253,9.36396103 Z M12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 Z M12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 Z"
      />
    </g>
  </svg>
);

export default VisibilityShow;
