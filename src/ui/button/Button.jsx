import { cva } from "class-variance-authority";
import React from "react";



const ButtonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "transition-colors",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "border",
    
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent",
          "bg-primary-500",
          "text-white",
          "hover:bg-primary-600",
          "focus:ring-primary-400",
        ],
        secondary: [
          "border-gray-200",
          "bg-white",
          "text-black",
          "hover:bg-gray-100",
          "focus:ring-primary-400",
        ],
        danger: [
          "border-transparent",
          "bg-red-600",
          "text-white",
          "hover:bg-red-700",
          "focus:ring-red-400",
        ]
      },
      size: {
        sm: ["text-base", "py-0.5", "px-1", "font-semibold"],
        md: ["text-base","py-3","px-4", "font-medium"],
        lg: ["text-lg","py-4","px-4", "font-medium"],
      },
      full: {
        true: ["w-full"],
      }
    },
  }
);

function Button({
  as = "button",
  size = "md",
  variant = "primary",
  full = false,
  children,
  ...props
}) {
  return React.createElement(
    as,
    {
      ...props,
      className: ButtonVariants({
        size: size,
        variant: variant,
        full: full,
        className: props.className,
      }),
    },
    children
  );
}

export default Button;
