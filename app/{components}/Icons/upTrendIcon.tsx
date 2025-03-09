import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const UpTrendIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    className={`inline w-4 h-4 mr-1 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M2 18 L6 10 L10 14 L14 6"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 6 L16 4 L16 8 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export default UpTrendIcon;
