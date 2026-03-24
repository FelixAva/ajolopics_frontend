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
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 select-none hover:cursor-pointer focus-visible:outline-none w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-deep-teal text-white border border-transparent hover:bg-deep-teal-700 focus-visible:ring-deep-teal-500",
    secondary: "bg-deep-teal-100 text-deep-teal-900 border border-transparent hover:bg-deep-teal-200",
    danger: "bg-smoky-rose-600 text-white border border-transparent hover:bg-smoky-rose-700 focus-visible:ring-smoky-rose-500",
    outline: "bg-transparent text-deep-teal border border-deep-teal hover:bg-deep-teal-50 hover:border-deep-teal-100 focus-visible:ring-deep-teal-500",
    ghost: "bg-transparent text-deep-teal border border-transparent hover:bg-deep-teal-50 focus-visible:ring-deep-teal-500",
    none: "bg-transparent text-deep-teal border-transparent rounded-full focus-visible:ring-transparent rounded-full"
  };

  const sizeStyles = {
    sm: "h-9 px-3.5 py-1.5 text-sm gap-1.5",
    md: "h-min px-4 py-2 md:text-lg gap-2",
    lg: "h-11 px-8 py-3 text-lg gap-2.5",
    none: "p-0"
  };

  const selectedStyles = isSelected
    ? "ring-2 ring-offset-2 ring-deep-teal-500"
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
