import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const GhanaCediIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    className={`inline w-6 h-6 mr-0.5 ${props.className || ''}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="24"
      fontWeight="700"
      fill="currentColor"
    >
      ₵
    </text>
  </svg>
);

export default GhanaCediIcon;
