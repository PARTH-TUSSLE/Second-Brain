import React from 'react'
import { IconStyles, type IconProps } from '.';

function PlusIcon(props: IconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        className={`${IconStyles[props.variant]} cursor-pointer`}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
}

export default PlusIcon
