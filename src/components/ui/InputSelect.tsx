import Select from 'react-select';
import type { GroupBase, Props as SelectProps } from 'react-select';
import type { Option } from '../../features/post/types/post.forms.types';

interface CustomSelectProps extends Omit<SelectProps<Option, boolean, GroupBase<Option>>, 'options'> {
  label: string;
  options: Option[];
  error?: string;
}

const InputSelect = ({
  label,
  name,
  options,
  isMulti,
  error,
  ...rest
}: CustomSelectProps) => {
  return (
    <div className='w-full flex flex-col text-left gap-1'>
      <p className='text-lg text-foreground'>{label}</p>

      <Select
        {...rest}
        isMulti={isMulti}
        name={name}
        options={options}
        unstyled
        menuPortalTarget={document.body}
        menuPosition={'fixed'}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
        classNames={{
          control: ({ isFocused }) => `
            flex w-full border rounded-lg px-1.5 py-0.5 transition-all
            ${isFocused ? 'border-input-focus ring-1 ring-input-focus' : 'border-input-border'}
            bg-transparent
          `,
          multiValue: () => 'bg-primary text-primary-contrast rounded-3xl px-2 py-0.5 m-0.5 flex items-center',
          multiValueLabel: () => 'text-sm font-medium text-primary-contrast',
          multiValueRemove: () => 'hover:text-primary-soft-hover ml-1 rounded-full p-0.5 cursor-pointer',

          menu: () => 'mt-2 border border-input-border bg-card rounded-lg shadow-lg overflow-hidden',

          // --- ESTA ES LA LÍNEA CLAVE PARA QUE NO CREZCA DE MÁS ---
          menuList: () => 'max-h-48 overflow-y-auto',
          // -------------------------------------------------------

          option: ({ isFocused, isSelected }) => `
            px-3 py-2 cursor-pointer transition-colors
            ${isSelected ? 'bg-primary text-primary-contrast' : ''}
            ${isFocused && !isSelected ? 'bg-accent text-accent-foreground' : ''}
          `,
          placeholder: () => 'text-placeholder',
          noOptionsMessage: () => 'p-2 text-subtle-foreground',
        }}
      />

      {error && (
        <span className='text-sm text-error'>{error}</span>
      )}
    </div>
  );
};

export default InputSelect;
