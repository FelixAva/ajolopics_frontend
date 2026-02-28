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
        className="w-auto h-auto text-md py-1 px-2.5 rounded-3xl cursor-pointer border bg-transparent border-dusty-olive select-none peer-checked:bg-dusty-olive peer-checked:text-white"
      >
        {title}
      </label>

    </div>
  );
};

export default Badge;
