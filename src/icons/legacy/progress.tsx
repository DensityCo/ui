import React from "react";

const Progress = ({color, width, height}) => <svg width={width || 18} height={height || 18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="1" fill="none" fillRule="evenodd">
  <g id="icons" transform="translate(-538 -571)">
    <g id="IconProgress" transform="translate(537 570)">
      <rect id="bounds" fillOpacity="0" fill="#E3E3E6" width="20" height="20"
      />
      <g id="Page-1" transform="translate(2 2)" stroke={color} strokeLinejoin="round"
        strokeWidth="1.5">
        <path d="M0.106911111,7.05244444 C0.331133333,5.24011111 1.16157778,3.61555556 2.38902222,2.38811111 C3.6148,1.16233333 5.23657778,0.332444444 7.04591111,0.106888889"
          id="Stroke-1" />
        <path d="M7.04592222,15.9830444 C5.23658889,15.7573778 3.61492222,14.9276 2.38914444,13.7018222 C1.16158889,12.4743778 0.331144444,10.8498222 0.106922222,9.03748889"
          id="Stroke-3" />
        <path d="M15.9840444,9.04496667 C15.7583778,10.8543 14.9286,12.4759667 13.7028222,13.7017444 C12.4753778,14.9293 10.8508222,15.7597444 9.03837778,15.9839667"
          id="Stroke-5" />
        <path d="M9.04597778,0.106833333 C10.8553111,0.3325 12.4769778,1.16227778 13.7027556,2.38805556 C14.9285333,3.61383333 15.7584222,5.23561111 15.9840889,7.04494444"
          id="Stroke-7" />
      </g>
    </g>
  </g>
</g>
</svg>;

export default Progress;
