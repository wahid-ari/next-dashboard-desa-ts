import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

type Props = {
  className?: string;
  href: string;
  icon?: ReactNode;
  isHome?: boolean;
  children: ReactNode;
};

export default function NavLink({ className, href, icon, isHome, children }: Props) {
  const router = useRouter();
  return (
    <Link
      passHref
      href={href}
      className={clsx(
        className,
        'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all',
        'hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-neutral-800',
        'focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500',
        router.pathname.includes(href) && !isHome
          ? 'bg-gray-100 font-medium text-blue-600 dark:bg-neutral-800 dark:text-sky-500'
          : // if home route (/)
          router.pathname === href && isHome
          ? 'bg-gray-100 font-medium text-blue-600 dark:bg-neutral-800 dark:text-sky-500 dark:hover:text-sky-500'
          : 'text-gray-700 dark:text-neutral-300 dark:hover:text-sky-500'
      )}
      //   className={`${className} flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500
      // ${router.pathname.includes(href) && !isHome
      //       ? 'bg-gray-100 font-medium text-blue-600 dark:bg-neutral-800 dark:text-sky-500'
      //       : router.pathname === href && isHome
      //         ? 'bg-gray-100 font-medium text-blue-600 dark:bg-neutral-800 dark:text-sky-500 dark:hover:text-sky-500'
      //         : 'text-gray-700 dark:text-neutral-300 dark:hover:text-sky-500'
      //     } hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-neutral-800`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

NavLink.logout = ({ href, icon, className, children }) => {
  return (
    <Link
      passHref
      href={href}
      className={clsx(
        className,
        'flex w-full items-center justify-start gap-3 rounded px-4 py-2 text-sm text-red-800 transition-all',
        'hover:bg-red-100 dark:text-red-500 dark:hover:bg-neutral-800 dark:hover:text-red-400'
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};
