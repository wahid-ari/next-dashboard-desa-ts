import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from '@components/layout/Breadcrumb';
import Navbar from './Navbar';
import Menu from './Menu';
import clsx from 'clsx';
import HeadSeo from './HeadSeo';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export default function Layout({ children, title, description }: Props) {
  return (
    <>
      <HeadSeo title={title} description={description} />

      <div
        className='font-inter min-h-screen w-full bg-[#F8F9FD] text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar />

        <div className='relative'>
          <Navbar />

          {/* Show on Mobile */}
          <div
            className={clsx(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:hidden',
              'overflow-x-auto bg-[#F8F9FD]/95 dark:bg-neutral-900/90',
              'scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={clsx(
              'hidden items-center justify-between gap-x-4 border-b py-3 px-4 dark:border-neutral-800 lg:flex',
              'sticky top-0 z-40',
              'bg-white/50 dark:bg-neutral-900/30',
              'backdrop-blur-md backdrop-filter'
            )}
          >
            <Breadcrumb />
            <Menu />
          </div>

          <div className='py-5 px-5'>{children}</div>
        </div>
      </div>
    </>
  );
}
