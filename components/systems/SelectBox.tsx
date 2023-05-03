import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';

type Option = {
  id: number;
  name: string;
};

type Props = {
  label?: string;
  value?: Option;
  onChange?: () => void;
  options?: object[];
  placeholder?: string;
};

export default function SelectBox({ label, value, onChange, options, placeholder }: Props) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-4'>
        <Listbox.Label className='text-sm font-medium dark:text-gray-200'>{label}</Listbox.Label>
        <Listbox.Button className='relative mt-2 w-full cursor-pointer rounded border border-gray-200 bg-white px-3 py-2 text-left text-sm transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800'>
          <span className='block truncate'>{value ? value?.name : placeholder || 'Choose'}</span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <SelectorIcon className='h-5 w-5 text-gray-500 dark:text-gray-200' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Listbox.Options className='absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none focus:ring-0 dark:border-neutral-700 dark:bg-neutral-900'>
          {options.map((option: Option, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `cursor-pointer px-3 py-2 text-neutral-700 hover:bg-gray-100 hover:text-sky-500 dark:text-gray-200 dark:hover:bg-neutral-800 dark:hover:text-sky-500 
								${active ? 'bg-gray-100 text-sky-500 dark:bg-neutral-800 dark:text-sky-500' : ' '}`
              }
              value={option}
            >
              {({ selected }) => (
                <span className={`block truncate ${selected ? 'font-medium text-sky-500' : ' '}`}>{option.name}</span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
