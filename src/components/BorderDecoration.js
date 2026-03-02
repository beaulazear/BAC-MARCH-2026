import React from 'react';
import '../styles/BorderDecoration.css';

const BorderDecoration = () => {
  return (
    <div className="border-decoration">
      {/* Single unified border frame */}
      <svg className="unified-border" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Outer wavy border - purple */}
        <path
          d="M2,8 Q5,3 8,5 T14,6 T20,4 T26,6 T32,5 T38,6 T44,4 T50,6 T56,5 T62,6 T68,4 T74,6 T80,5 T86,6 T92,4 Q95,3 98,8 L98,92 Q95,97 92,96 T86,94 T80,95 T74,94 T68,96 T62,94 T56,95 T50,94 T44,96 T38,94 T32,95 T26,94 T20,96 T14,94 T8,95 Q5,97 2,92 Z"
          fill="none"
          stroke="#667eea"
          strokeWidth="0.4"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Inner sketchy border - red */}
        <path
          d="M4,10 Q6,6 9,7 T15,8 T21,7 T27,8 T33,7 T39,8 T45,7 T51,8 T57,7 T63,8 T69,7 T75,8 T81,7 T87,8 T93,7 Q94,6 96,10 L96,90 Q94,94 93,93 T87,92 T81,93 T75,92 T69,93 T63,92 T57,93 T51,92 T45,93 T39,92 T33,93 T27,92 T21,93 T15,92 T9,93 Q6,94 4,90 Z"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="0.3"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
        />

        {/* Additional sketchy inner line for depth */}
        <path
          d="M3,9 Q5.5,4 8.5,6 T15,7 T21.5,6 T28,7 T34.5,6 T41,7 T47.5,6 T54,7 T60.5,6 T67,7 T73.5,6 T80,7 T86.5,6 T93,7 Q94.5,4 97,9 L97,91 Q94.5,96 93,94 T86.5,93 T80,94 T73.5,93 T67,94 T60.5,93 T54,94 T47.5,93 T41,94 T34.5,93 T28,94 T21.5,93 T15,94 T8.5,93 Q5.5,96 3,91 Z"
          fill="none"
          stroke="#667eea"
          strokeWidth="0.25"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default BorderDecoration;
