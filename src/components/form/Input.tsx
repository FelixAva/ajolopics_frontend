import type { HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
}

const Input = ({
  label,
  placeholder,
  type='text',
  error
}: Props ) => {
  return (
    <div className='w-min flex flex-col'>
      <p className='text-left text-lg'>{ label }</p>

      <input
        type={ type }
        placeholder={ placeholder }
        className='border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700'
      />

      {
        error && (
          <span className='text-sm text-red-400'>{error}</span>
        )
      }
    </div>
  );
};

export default Input;
