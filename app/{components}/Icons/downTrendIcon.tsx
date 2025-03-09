import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const DownTrendIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    className={`inline w-4 h-4 mr-1 text-red-500 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M2 6 L6 14 L10 10 L14 18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 18 L16 20 L16 16 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export default DownTrendIcon;
