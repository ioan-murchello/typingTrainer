import React from "react"; 

const BackgroundDecor = () => (
  <svg className="fixed inset-0 w-full h-full opacity-[0.06] pointer-events-none -z-5">
    <defs>
      <pattern
        id="circuit"
        x="0"
        y="0"
        width="250"
        height="250"
        patternUnits="userSpaceOnUse"
      >
        {/* horizontal line */}
        <path
          d="M 0 100 L 50 100 L 70 120 L 150 120 L 170 100 L 250 100"
          fill="none"
          stroke="#ffee02"
          strokeWidth="1.2"
        />
        
        {/* vertical line (new) */}
        <path
          d="M 125 0 L 125 50 L 105 70 L 105 180 L 125 200 L 125 250"
          fill="none"
          stroke="#ffff01"
          strokeWidth="1.2"
        />

        {/* diagonal detail */}
        <path
          d="M 200 250 L 250 200"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <path
          d="M 0 50 L 50 0"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* contacts nodes (Nodes) */}
        <circle cx="70" cy="120" r="2" fill="#3b82f6" />
        <circle cx="170" cy="100" r="2" fill="#3b82f6" />
        <circle cx="105" cy="70" r="2" fill="#3b82f6" />
        <circle cx="105" cy="180" r="2" fill="#3b82f6" />
        
        {/* small chip */}
        <rect x="115" y="115" width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
      </pattern>
    </defs>
    
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

export default BackgroundDecor;
 
