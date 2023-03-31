import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export default function Akun({ className }: Props) {
  return (
    <Menu as='div' className={`relative ${className && className}`}>
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'inline-flex w-full items-center justify-center rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500',
              'text-gray-700 hover:text-gray-900 focus:outline-none dark:text-neutral-300 dark:hover:text-neutral-100'
            )}
          >
            Admin
            <ChevronDownIcon
              className={`${open ? 'rotate-180' : 'rotate-0'} ml-1 h-5 w-4 pb-0.5 transition-all duration-200`}
              aria-hidden='true'
            />
          </Menu.Button>
          <Transition
            enter='transition ease-in-out duration-300'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in-out duration-100'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-4 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-md focus:outline-none dark:bg-neutral-800'>
              <div className='px-2 py-2'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-gray-100 text-blue-600 transition-all dark:bg-neutral-900 dark:text-sky-500'
                          : 'text-gray-700 dark:text-neutral-300'
                      } mb-1 flex w-full rounded px-2 py-1.5 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/settings'
                      className={`${
                        active
                          ? 'bg-gray-100 text-blue-600 transition-all dark:bg-neutral-900 dark:text-sky-500'
                          : 'text-gray-700 dark:text-neutral-300'
                      } flex w-full rounded px-2 py-1.5 text-sm`}
                    >
                      Setting
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
