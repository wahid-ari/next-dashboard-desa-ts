import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
  id?: string;
  name: string;
  className?: string;
  defaultValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  [props: string]: any;
};

export default function Select({ label, id, name, className, defaultValue, onChange, children, ...props }: Props) {
  return (
    <div className=''>
      {label && (
        <label htmlFor={name} className='block text-sm font-semibold text-neutral-800 dark:text-gray-200'>
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={clsx(
          className,
          'mt-2 block w-full cursor-pointer rounded-md px-3 py-[0.3rem] text-sm font-medium transition-all dark:text-white',
          'border border-gray-300 bg-white outline-none dark:bg-neutral-900',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 '
        )}
      >
        {children}
      </select>
    </div>
  );
}

type OptionProps = {
  value: any;
  children: ReactNode;
  [props: string]: any;
};

Select.option = ({ value, children, ...props }: OptionProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};
