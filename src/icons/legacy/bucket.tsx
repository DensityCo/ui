import React from "react";

const Bucket = ({color, width, height}) => <svg width={width || "16"} height={height || "14"} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" fill="none" fillRule="evenodd">
        <g id="IconBucket" transform="translate(-2 -3)">
            <rect id="bounds" fillOpacity="0" fill={color} width="20" height="20"
            />
            <g id="Group-7" transform="translate(2 4)" stroke={color} strokeLinejoin="round"
            strokeWidth="1.5">
                <polygon id="Stroke-1" points="2 0 4 12 12 12 14 0" />
                <path d="M9.06065556,4.56065556 C8.47487778,5.14643333 7.5251,5.14643333 6.93932222,4.56065556 C6.35354444,3.97487778 6.35354444,3.0251 6.93932222,2.43932222 C7.5251,1.85354444 8.47487778,1.85354444 9.06065556,2.43932222 C9.64643333,3.0251 9.64643333,3.97487778 9.06065556,4.56065556 L9.06065556,4.56065556 Z"
                id="Stroke-3" strokeLinecap="round" />
                <path d="M0,0 L16,0" id="Stroke-5" />
                <path d="M6.93934444,4.56065556 L1.00001111,10.9999889" id="Stroke-7"
                />
            </g>
        </g>
    </g>
</svg>;

export default Bucket;
