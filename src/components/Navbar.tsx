"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  PencilLine,
  UserCircle2,
  Menu,
  LogOut,
  Bookmark,
  Star,
} from "lucide-react";

import { Logo, ThemeToggle } from ".";
import { useState } from "react";
import Image from "next/image";
import useAuthModalStore from "@/store/auth-modal-store";

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

  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const { setIsOpen } = useAuthModalStore();

  const handleDropdownClick = () => {
    if (session?.user) {
      setDropdownMenuOpen((prev) => !prev);
    } else {
      setIsOpen(true);
    }
  };

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
                <Link
                  className='text-lg'
                  onClick={() => setIsMenuOpen(false)}
                  key={link.name}
                  href={link.path}
                >
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
          <button onClick={handleDropdownClick} className='pr-2 relative'>
            {session?.user ? (
              <Image
                src={session.user.image as string}
                alt='user-img'
                width={25}
                height={25}
                className='rounded-full'
              />
            ) : (
              <UserCircle2 height={25} width={25} />
            )}
            {dropdownMenuOpen && (
              <div className='absolute z-[100] top-10 w-[220px] bg-gray-50 shadow-md dark:bg-gray-900 right-0 p-2 rounded-md'>
                <div className='flex items-center gap-3'>
                  <Image
                    src={session?.user?.image as string}
                    alt='user-img'
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                  <div>
                    <Link
                      href={`/profile/${session?.user.id}`}
                      className='text-ellipsis'
                    >
                      {(session?.user?.name as string).length >= 9
                        ? `${session?.user?.name?.slice(0, 12)}...`
                        : session?.user?.name}
                    </Link>
                  </div>
                </div>
                <Link href='/settings' className='profile-menu-btn'>
                  <UserCircle2 />
                  Account settings
                </Link>
                <Link
                  href='/bookmarks'
                  className='profile-menu-btn hidden lg:flex'
                >
                  <Bookmark />
                  Bookmarks
                </Link>
                <Link
                  href='/favorites'
                  className='profile-menu-btn hidden lg:flex'
                >
                  <Star />
                  Favorites
                </Link>
                <button
                  onClick={() => signOut()}
                  className='profile-menu-btn w-full text-red-600'
                >
                  <LogOut />
                  Sign Out
                </button>
              </div>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
