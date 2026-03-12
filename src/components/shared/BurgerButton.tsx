import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton = ({ isOpen, onClick }: Props) => {
  return (
    <div className='flex gap-2 items-center md:sr-only'>
      <button
        onClick={onClick}
        className="w-12.5 h-12.5 flex items-center justify-center bg-deep-teal-100 rounded-lg md:hidden"
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          <span
            className={clsx(
              "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            )}
          />
          <span
            className={clsx(
              "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
              isOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={clsx(
              "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            )}
          />
        </div>
      </button>
    </div>
  );
};

export default BurgerButton;
