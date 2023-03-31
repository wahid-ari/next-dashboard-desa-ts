import { useContext } from 'react';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/solid';
import { GlobalContext } from '@utils/GlobalContext';
import Menu from './Menu';
import clsx from 'clsx';
import ThemeChanger from './ThemeChanger';

export default function Navbar() {
  const { setShowNav } = useContext(GlobalContext);

  const showMenu = () => {
    setShowNav(true);
  };

  return (
    <div
      className={clsx(
        'sticky top-0 z-40 h-11 dark:text-neutral-50 lg:hidden',
        'flex w-full items-center justify-between gap-4 border-b p-3 px-5 dark:border-neutral-800',
        'bg-white/50 dark:bg-neutral-900/30',
        'backdrop-blur-md backdrop-filter'
      )}
    >
      <div className='flex gap-x-3'>
        <button
          className='-ml-0.5 rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500'
          id='menu'
          aria-label='Menu'
        >
          <MenuIcon
            className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            onClick={showMenu}
          />
        </button>
        <Link
          href='/'
          className='rounded text-center text-base font-semibold tracking-wide text-neutral-800 no-underline focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500 dark:text-neutral-100 lg:text-2xl'
        >
          Desa Digital
        </Link>
      </div>

      <div className='flex items-center gap-3'>
        <div className='cursor-pointer pt-1'>
          <ThemeChanger />
        </div>

        <Menu className='lg:hidden' />
      </div>
    </div>
  );
}
