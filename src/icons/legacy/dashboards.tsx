import React from "react";

const Dashboards = ({color, width, height}) => <svg width={width || 18} height={height || 18} viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
<g id="1.0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    <g id="icons" transform="translate(-330.000000, -467.000000)">
        <g id="iconDashboard" transform="translate(329.000000, 466.000000)">
            <rect id="bounds" fillOpacity="0" fill="#E3E3E6" x="0" y="0" width="20" height="20"></rect>
            <path d="M5,5.03369141 L5,3 C5,2.44771525 5.44771525,2 6,2 L17,2 C17.5522847,2 18,2.44771525 18,3 L18,14 C18,14.5522847 17.5522847,15 17,15 L15.0554199,15" id="Path" stroke={color} strokeWidth="1.5" strokeLinejoin="round"></path>
            <path d="M2,17.0014977 C2,17.5529553 2.44748943,18 2.99850233,18 L14.0014977,18 C14.5529553,18 15,17.5525106 15,17.0014977 L15,5.99850233 C15,5.44704472 14.5525106,5 14.0014977,5 L2.99850233,5 C2.44704472,5 2,5.44748943 2,5.99850233 L2,17.0014977 Z" id="icon-square-copy-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M11.5,11 L11.5,15" id="---" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
            <path d="M8.5,12 L8.5,15" id="---" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
            <path d="M5.5,10 L5.5,15" id="---" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
        </g>
    </g>
</g>
</svg>;

export default Dashboards;
