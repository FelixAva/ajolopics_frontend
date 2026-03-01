import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from 'lucide-react/dynamic';
import { clsx } from 'clsx';

interface Props {
  title: string;
  icon?: IconName;
  variant?: 'default' | 'ghost';
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
        "w-auto h-min px-3.5 py-2 rounded-lg md:text-lg transition-colors duration-200 border select-none hover:cursor-pointer",
        variant === "default"
          ? "bg-deep-teal text-white border-transparent hover:bg-deep-teal-700 hover:border-deep-teal-700"
          : "bg-transparent text-deep-teal border-deep-teal hover:bg-deep-teal-100 hover:border-deep-teal-100"
      )}
      type={type}
    >
      {(
        <div className="flex items-center justify-center gap-3 text-center">
          {
            icon && <DynamicIcon name={icon} size={22} />
          }
          <p className='w-fill'>{ title }</p>
        </div>
      )}
    </button>
  );
};

export default Button;
