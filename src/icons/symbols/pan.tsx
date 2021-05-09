import * as React from "react";

const Pan = ({ width, height, color }) => (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C11 2.89543 11.8954 2 13 2H14C14.7403 2 15.3866 2.4022 15.7324 3H17C18.1045 3 19 3.89543 19 5H20C21.1045 5 22 5.89543 22 7V18C22 20.2091 20.2091 22 18 22H10.8397C9.38009 22 7.99334 21.3622 7.04343 20.254L1.63806 13.9477L3.63806 11.9477C4.37704 11.2087 5.56038 11.1633 6.35386 11.8434L7.99997 13.2544V6C7.99997 4.89543 8.8954 4 9.99997 4L11 4ZM19 7V13H17V5H16V13H14V4L13 4V13H11V6H9.99997V16H8.13005L5.05228 13.3619L4.36188 14.0523L8.56194 18.9524C9.13189 19.6173 9.96394 20 10.8397 20H18C19.1045 20 20 19.1046 20 18V7H19Z"
        fill={color}
      />
    </svg>
  );


export default Pan;

