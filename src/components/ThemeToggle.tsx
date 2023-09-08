"use client";

import useMounted from "@/hooks/use-mounted";
import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <button
      className='p-2 border border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-800 rounded-full'
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? (
        <MoonStar height={22} width={22} />
      ) : (
        <Sun height={22} width={22} />
      )}
    </button>
  );
};

export default ThemeToggle;
