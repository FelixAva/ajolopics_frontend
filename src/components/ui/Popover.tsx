import {
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { type IconName, DynamicIcon } from 'lucide-react/dynamic';

export interface PopoverAction {
  id: string;
  label: ReactNode;
  icon?: IconName;
  description?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  closeOnSelect?: boolean;
  variant?: 'default' | 'danger';
  className?: string;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export interface PopoverProps {
  trigger: ReactNode | ((props: PopoverTriggerProps) => ReactNode);
  actions: PopoverAction[];
  title?: ReactNode;
  description?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  ariaLabel?: string;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  actionsClassName?: string;
}

const positionStyles = {
  'bottom-start': 'left-0 top-full mt-3',
  'bottom-end': 'right-0 top-full mt-3',
  'top-start': 'bottom-full left-0 mb-3',
  'top-end': 'bottom-full right-0 mb-3',
};

const Popover = ({
  trigger,
  actions,
  title,
  description,
  open,
  defaultOpen = false,
  onOpenChange,
  position = 'bottom-end',
  ariaLabel,
  className,
  triggerClassName,
  panelClassName,
  actionsClassName,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();
  const descriptionId = useId();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setPopoverOpen = useCallback((nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPopoverOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPopoverOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setPopoverOpen]);

  const triggerProps: PopoverTriggerProps = {
    type: 'button',
    isOpen,
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? panelId : undefined,
    onClick: () => setPopoverOpen(!isOpen),
  };

  const renderTrigger = () => {
    if (typeof trigger === 'function') {
      return trigger(triggerProps);
    }

    return (
      <button
        {...triggerProps}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
          triggerClassName,
        )}
      >
        {trigger}
      </button>
    );
  };

  return (
    <div ref={rootRef} className={clsx('relative text-left flex items-center justify-center', className)}>
      {renderTrigger()}

      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label={title ? undefined : ariaLabel ?? 'Actions'}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={clsx(
            'absolute z-50 w-[min(14rem,calc(100vw-2rem))] rounded-xl bg-card p-3.5 shadow-xl ring-1 ring-overlay/5',
            positionStyles[position],
            panelClassName,
          )}
        >
          {(title || description) && (
            <div className="mb-3 space-y-0.5">
              {title && (
                <h2
                  id={titleId}
                  className="font-poppins text-xl leading-tight text-card-foreground"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id={descriptionId}
                  className="text-base font-semibold leading-tight text-card-foreground"
                >
                  {description}
                </p>
              )}
            </div>
          )}

          <ul className={clsx('flex flex-col gap-1.5', actionsClassName)}>
            {actions.map((action) => {
              const isDanger = action.variant === 'danger';

              return (
                <li key={action.id}>
                  <button
                    type="button"
                    disabled={action.disabled}
                    onClick={() => {
                      action.onClick?.();

                      if (action.closeOnSelect ?? true) {
                        setPopoverOpen(false);
                      }
                    }}
                    className={clsx(
                      'group flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
                      isDanger
                        ? 'text-danger-foreground hover:bg-danger-subtle focus-visible:ring-danger-ring'
                        : 'text-primary hover:bg-primary-hover/70 focus-visible:ring-primary-ring',
                      action.className,
                    )}
                  >
                    {action.icon && (
                      <DynamicIcon
                        name={action.icon}
                        size={20}
                        strokeWidth={1.75}
                        className="shrink-0"
                      />
                    )}

                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-lg font-light leading-tight">
                        {action.label}
                      </span>

                      {action.description && (
                        <span className="mt-0.5 text-xs leading-snug text-supporting-foreground">
                          {action.description}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Popover;
