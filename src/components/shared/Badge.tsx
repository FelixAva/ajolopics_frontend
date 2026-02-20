import { useState } from 'react';
import { clsx } from 'clsx';

interface Props {
  title: string;
  isDisable?: boolean;
}

const Badge = ({
  title,
  isDisable
}: Props ) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectTag = () => {
    if (isDisable) return;

    setIsSelected(!isSelected);
  };

  return (
    <button
      onClick={ selectTag }
      className={clsx(
        "w-min text-md py-1 px-2.5 rounded-3xl",
        isSelected
        ? "bg-dusty-olive text-white border-transparent"
        : "bg-transparent text-dusty-olive border border-dusty-olive"
    )}>
      <p>{ title }</p>
    </button>
  );
};

export default Badge;
