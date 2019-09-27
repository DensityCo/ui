import React from "react";

const Zoom = ({color, width, height}) => <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <g id="Page-1" fill="none" fillRule="evenodd">
      <g id="IconZoom" transform="translate(-1 -1)">
          <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
          />
          <g id="Group" transform="translate(2 2)" stroke={color} strokeLinejoin="round"
          strokeWidth="1.5">
              <path d="M9.5,13 C5.91019444,13 3,10.0898056 3,6.5 C3,2.91010417 5.91019444,0 9.5,0 C13.0898958,0 16,2.91010417 16,6.5 C16,10.0898056 13.0898958,13 9.5,13 Z"
              id="icon_circle" strokeLinecap="round" />
              <path d="M12.4224494,6.58823529 L6.76470588,6.58823529" id="Stroke-2"
              strokeLinecap="square" />
              <path d="M9.59357767,3.75936351 L9.59357767,9.41710708" id="Stroke-2"
              strokeLinecap="square" />
              <path d="M0,16 L4,12" id="Path-6" strokeLinecap="square" />
          </g>
      </g>
  </g>
</svg>;

export default Zoom;
