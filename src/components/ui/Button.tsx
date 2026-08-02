import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'none';
  isSelected?: boolean;
}

const variantStyles = {
  primary: 'bg-primary text-primary-contrast border border-transparent hover:bg-primary-active focus-visible:ring-primary-ring',
  secondary: 'bg-primary-hover text-primary-soft-foreground border border-transparent hover:bg-primary-soft-hover',
  danger: 'bg-danger-background text-danger-foreground border border-transparent hover:bg-danger-hover focus-visible:ring-danger-ring',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-subtle hover:border-primary-hover focus-visible:ring-primary-ring',
  ghost: 'bg-transparent text-primary border border-transparent hover:bg-primary-hover focus-visible:ring-primary-ring',
  none: 'bg-transparent text-primary border-transparent rounded-full focus-visible:ring-transparent',
};

const sizeStyles = {
  sm: 'h-9 px-3.5 py-1.5 text-sm gap-1.5',
  md: 'h-min px-4 py-2 md:text-lg gap-2',
  lg: 'h-11 px-8 py-3 text-lg gap-2.5',
  none: 'p-0',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isSelected = false,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={clsx(
        'inline-flex w-auto cursor-pointer select-none items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        isSelected && 'ring-2 ring-primary-ring ring-offset-2',
        className,
      )}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export type { ButtonProps };
export default Button;
