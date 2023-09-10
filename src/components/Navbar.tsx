"use client";

import Link from "next/link";
import { Search, PencilLine, UserCircle2, Menu } from "lucide-react";

import { Logo, ThemeToggle } from ".";
import { useState } from "react";

const Navbar = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Favorites",
      path: "/favorites",
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1625]'>
      <nav className='wrapper flex justify-between items-center py-3'>
        {/* logo */}
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className='block lg:hidden pl-2'
            >
              {" "}
              <Menu />
            </button>
            <div
              className={`absolute z-50 lg:hidden top-10 w-screen ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } bg-gray-50 dark:bg-gray-900 h-[90vh] py-5 px-3 flex flex-col gap-5 duration-100 ease-in`}
            >
              {links.map((link) => (
                <Link className='text-lg' key={link.name} href={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <Logo />
        </div>
        <div className='flex items-center gap-3'>
          {/* search */}
          <button className='p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-800 text-gray-500 dark:text-white'>
            <Search height={22} width={22} />
          </button>
          {/* write */}
          <Link
            href='/draft'
            className='p-2 lg:py-2 lg:px-4 flex items-center bg-transparent lg:bg-blue-600 lg:hover:bg-blue-500 text-black dark:text-white lg:text-white gap-3 rounded-full'
          >
            <PencilLine height={22} width={22} />
            <p className='hidden lg:block'>Write</p>
          </Link>
          {/* theme-toggle */}
          <ThemeToggle />
          {/* avatar */}
          <button className='pr-2'>
            <UserCircle2 height={25} width={25} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
