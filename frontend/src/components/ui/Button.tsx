import React, { type ReactElement } from 'react'

  interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?:  boolean;
  }

const VariantStyles = {
  primary: "bg-violet-500 text-white",
  secondary: "bg-violet-200 text-violet-500",
};

const sizeStyles = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8"
}

const defaultStyle = "rounded-md font-bold flex"

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${VariantStyles[props.variant]} ${defaultStyle} ${
        sizeStyles[props.size]
      } cursor-pointer hover:opacity-80 transition-all duration-200 ${props.fullWidth? " w-full flex justify-center items-center" : ""} ${ props.loading? " disabled opacity-50 ": "" } `}
    >
      {props.startIcon? <div className='pr-2' >{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon? <div className='pl-2' >{props.endIcon}</div>: null}
    </button>
  );
}

export default Button
