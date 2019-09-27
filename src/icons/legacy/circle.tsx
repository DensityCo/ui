import React from "react";

const Circle = ({color, width, height}) => <svg width={width || "18"} height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g id="Page-1" fill="none" fillRule="evenodd">
    <g id="IconCircle" transform="translate(-1 -1)" fill={color} fillRule="nonzero">
        <path d="M10,17.25 C14.0040798,17.25 17.25,14.0040486 17.25,10 C17.25,5.99588023 14.0041198,2.75 10,2.75 C5.99595135,2.75 2.75,5.99592021 2.75,10 C2.75,14.0040087 5.99599134,17.25 10,17.25 Z M10,18.75 C5.16756422,18.75 1.25,14.8324358 1.25,10 C1.25,5.16748987 5.16752745,1.25 10,1.25 C14.8325469,1.25 18.75,5.1674531 18.75,10 C18.75,14.8324725 14.8325101,18.75 10,18.75 Z"
        id="icon_circle" />
    </g>
</g>
</svg>;

export default Circle;
