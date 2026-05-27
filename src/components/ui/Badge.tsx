interface Props {
  id: number;
  title: string;
  checked: boolean;
  isDisable?: boolean;
  onChange: (id: number) => void;
}

const Badge = ({
  id,
  title,
  checked,
  isDisable,
  onChange
}: Props ) => {

  return (
    <div className="flex">
      <input
        id={`badge-${id}`}
        onChange={() => onChange(id)}
        type='checkbox'
        checked={checked}
        className='peer sr-only'
        disabled={isDisable}
      ></input>

      <label
        htmlFor={`badge-${id}`}
        className={`w-auto h-auto text-md py-1 px-2.5 rounded-3xl text-primary ${isDisable || 'cursor-pointer'} border bg-transparent border-primary select-none peer-checked:bg-primary peer-checked:text-primary-contrast`}
      >
        {title}
      </label>

    </div>
  );
};

export default Badge;
