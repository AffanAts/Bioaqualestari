// components/Sidebar.tsx
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  const linkClass = (path: string) => 
    pathname === path
      ? "block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      : "block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline";

  if (status === "authenticated") {
    return (
      <div className="md:flex flex-col w-full md:w-64 text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800 flex-shrink-0">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a
            href="#"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline"
          >
            Flowtrail UI
          </a>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={toggleMenu}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav className={`md:block ${open ? "block" : "hidden"}`}>
          <Link className={linkClass("/admin/dashboard")} href="/admin/dashboard">
            Dashboard
          </Link>
          <Link className={linkClass("/admin/client")} href="/admin/client">
            Client
          </Link>
          <Link className={linkClass("/admin/project")} href="/admin/project">
            Project
          </Link>
          <Link className={linkClass("/admin/service")} href="/admin/service">
            Service
          </Link>
          <Link className={linkClass("/admin/blog")} href="/admin/blog">
            Blog
          </Link>
          <button
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </nav>
      </div>
    );
  }
};

export default Sidebar;
