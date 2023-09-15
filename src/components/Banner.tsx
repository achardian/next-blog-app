"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from ".";
import useAuthModalStore from "@/store/auth-modal-store";

const Banner = () => {
  const { data: session } = useSession();
  const { setIsOpen } = useAuthModalStore();

  return (
    <div
      className={`w-full h-96 mb-5 md:h-80 ${
        session?.user ? "hidden" : "flex"
      } flex-col-reverse gap-6 md:gap-0 md:flex-row items-center justify-between gradient-bg p-5 rounded-xl`}
    >
      <div className='pl-5'>
        <div className='text-3xl font-bold tracking-wide  gradient-text'>
          <h1>Share Your Ideas</h1>
          <h1>to Everyone Around The World!</h1>
        </div>
        <Button
          text='Sign In'
          onClick={() => setIsOpen(true)}
          className='bg-blue-600 px-5 mt-3 rounded-full hover:bg-blue-500 text-white w-full md:w-fit'
        />
      </div>
      <div className='relative w-full md:w-2/3 h-full'>
        <Image src='/Blogging.svg' alt='Blogging' fill />
      </div>
    </div>
  );
};

export default Banner;
