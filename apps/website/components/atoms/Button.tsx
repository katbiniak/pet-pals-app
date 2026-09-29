import { cn } from '@/utils/cn';
import { tv } from 'tailwind-variants';
import { type VariantProps } from "tailwind-variants";
import React from 'react';

const buttonStyles = tv({
  base: 'relative text-center text-xl font-semibold items-center justify-center whitespace-nowrap inline-flex select-none cursor-pointer px-4 py-3 min-w-44',
  variants: {
    color: {
      primary: "bg-plum text-white rounded-[4px] disabled:bg-charcoal/50 hover:bg-blossom",
      secondary: "bg-transparent text-plum border border-plum rounded-[4px] hover:bg-blossom",
      link: "text-plum underline hover:text-blossom"
    }
  },
  defaultVariants: {
    color: "primary"
  }
});

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text?: string;
  buttonVariant?: 'primary' | 'secondary' | 'link';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> =
({
  text,
  buttonVariant,
  disabled,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      className={buttonStyles({color: buttonVariant, className})}
      disabled={disabled}
      onClick={onClick}
    >
      {text ? (
        <span>{text}</span>
      ) : (
        <>
        {children}
        </>
      )}
    </button>
  );
}

export default Button;