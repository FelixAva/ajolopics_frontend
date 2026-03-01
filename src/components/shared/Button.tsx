import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from 'lucide-react/dynamic';
import { clsx } from 'clsx';

interface Props {
  title?: string;
  icon?: IconName;
  variant?: 'default' | 'inverted' | 'ghost' | 'none' ;
  type?: 'button' | 'submit' | 'reset';
  action: () => void;
}

const Button = ({
  title,
  icon,
  variant='default',
  type='button',
  action
}: Props ) => {
  return (
    <button
      onClick={action}
      className={clsx(
        "w-auto h-min px-3.5 py-2 rounded-lg md:text-lg transition-colors duration-200 select-none hover:cursor-pointer",
        {
          'bg-deep-teal text-white border-transparent hover:bg-deep-teal-700 hover:border-deep-teal-700': variant === 'default',
          'bg-transparent text-deep-teal border border-deep-teal hover:bg-deep-teal-100 hover:border-deep-teal-100': variant === 'inverted',
          'bg-transparent text-deep-teal border-deep-teal hover:bg-deep-teal-100 hover:border-deep-teal-100': variant === 'ghost',
          'border-transparent rounded-none': variant === 'none'
        },
      )}
      type={type}
    >
      {(
        <div className="flex items-center justify-center gap-3 text-center">
          {
            icon && <DynamicIcon name={icon} size={22} />
          }
          {
            title && <p className='w-fill'>{ title }</p>
          }
        </div>
      )}
    </button>
  );
};

export default Button;
