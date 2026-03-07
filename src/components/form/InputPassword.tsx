import { forwardRef, useState } from 'react';
import Button from '../shared/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  error?: string;
  pwdRecovery?: boolean;
}

const InputPassword = forwardRef<HTMLInputElement, Props> (function Input (
  { label, error, pwdRecovery, ...rest },
  ref
) {
  const { t } = useTranslation('components');

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const changeVisible = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className='w-auto flex flex-col text-left relative'>
      <p className='text-lg'>{ label }</p>

      {
        pwdRecovery && (
          <div className='absolute right-0'>
            <span>{t('inputPwd.forgotPassword')}</span>
          </div>
        )
      }

      <input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        placeholder='••••••••'
        {...rest}
        className='w-full border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700'
      />

      <Button
        type='button'
        className='absolute right-0 top-7'
        icon={isVisible ? 'eye-off' : 'eye'}
        variant='none'
        action={changeVisible}
      />

      {
        error && (
          <span className='text-sm text-red-400'>{error}</span>
        )
      }
    </div>
  );
});

export default InputPassword;
