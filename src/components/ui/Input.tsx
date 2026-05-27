import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import Button from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, name, type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id || name;

    const inputType = type === 'password'
      ? (showPassword ? 'text' : 'password')
      : type;

    return (
      <div className="flex flex-col text-left w-full">
        <label htmlFor={inputId} className="block text-lg text-foreground">
          {label}
        </label>

        <div className="relative">
          <input
            id={inputId}
            name={name}
            ref={ref}
            type={inputType}
            className={`block w-full border border-input-border rounded-lg px-2.5 py-1.5 focus:outline-input-focus ${className}`}
            {...rest}
          />

          {/* Lógica y posicionamiento CSS del Componente 1 */}
          {type === 'password' && (
            <Button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              variant="none"
              size="sm"
              icon={showPassword ? 'eye-off' : 'eye'}
              onClick={() => setShowPassword(prev => !prev)}
            />
          )}
        </div>

        {error && (
          <span className="mt-1 text-sm text-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
