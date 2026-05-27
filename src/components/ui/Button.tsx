import type { ButtonHTMLAttributes, ReactNode, FC } from 'react';
import { type IconName, DynamicIcon } from 'lucide-react/dynamic';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: IconName;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'none';
  isSelected?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  title,
  icon,
  variant = 'primary',
  size = 'md',
  isSelected = false,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg transition-colors duration-200 select-none hover:cursor-pointer focus-visible:outline-none w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-primary text-primary-contrast border border-transparent hover:bg-primary-active focus-visible:ring-primary-ring",
    secondary: "bg-primary-hover text-primary-soft-foreground border border-transparent hover:bg-primary-soft-hover",
    danger: "bg-danger-background text-danger-foreground border border-transparent hover:bg-danger-hover focus-visible:ring-danger-ring",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary-subtle hover:border-primary-hover focus-visible:ring-primary-ring",
    ghost: "bg-transparent text-primary border border-transparent hover:bg-primary-hover focus-visible:ring-primary-ring",
    none: "bg-transparent text-primary border-transparent rounded-full focus-visible:ring-transparent rounded-full"
  };

  const sizeStyles = {
    sm: "h-9 px-3.5 py-1.5 text-sm gap-1.5",
    md: "h-min px-4 py-2 md:text-lg gap-2",
    lg: "h-11 px-8 py-3 text-lg gap-2.5",
    none: "p-0"
  };

  const selectedStyles = isSelected
    ? "ring-2 ring-offset-2 ring-primary-ring"
    : "";

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${selectedStyles} ${className}`;

  return (
    <button
      className={finalClassName}
      type={type}
      {...props}
    >
      {icon || title ? (
        <>
          {icon && <DynamicIcon name={icon} size={22} />}
          {title && <span>{title}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
