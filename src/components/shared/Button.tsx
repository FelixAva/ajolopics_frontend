import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from 'lucide-react/dynamic';
import { clsx } from 'clsx';

interface Props {
  title: string;
  icon: IconName;
  variant?: 'default' | 'ghost';
  type?: 'button' | 'submit';
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
        "w-auto h-min px-3.5 py-2 rounded-lg md:text-lg transition-colors duration-200 border hover:cursor-pointer",
        variant === "default"
          ? "bg-[#496F5D] text-white border-transparent hover:bg-transparent hover:text-[#496F5D] hover:border-[#496F5D]"
          : "bg-transparent text-[#496F5D] border-[#496F5D] hover:bg-[#496F5D] hover:text-white"
      )}
      type={type}
    >
      {(
        <div className="flex items-center gap-3">
          <DynamicIcon name={icon} size={22} />
          <p>{ title }</p>
        </div>
      )}
    </button>
  );
};

export default Button;
