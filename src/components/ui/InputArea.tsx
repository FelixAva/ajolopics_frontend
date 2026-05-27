import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const InputArea = forwardRef<HTMLTextAreaElement, Props> (function Input (
  { label, error, className, ...rest },
  ref
) {
  return (
    <div className='w-auto flex flex-col text-left'>
      <p className='text-lg'>{ label }</p>

      <textarea
        ref={ref}
        {...rest}
        className={`w-full border border-input-border rounded-lg px-2.5 py-1.5 focus:outline-input-focus ${className ?? ''}`}
      />

      {
        error && (
          <span className='text-sm text-error'>{error}</span>
        )
      }
    </div>
  );
});

export default InputArea;
