"use client";

import useAuthModalStore from "@/store/auth-modal-store";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { Logo } from ".";
import { X } from "lucide-react";

const AuthModal = () => {
  const { isOpen, setIsOpen } = useAuthModalStore();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef}>
      <div className='w-[40vw] bg-white dark:bg-gray-900 p-5 flex flex-col items-center relative rounded-md'>
        <Logo />
        <h1>Share and Discover Ideas around the world!</h1>
        <button
          onClick={() => signIn("google")}
          className='flex justify-center items-center gap-3 bg-gray-300 dark:bg-gray-700 w-full rounded-full py-2 mt-8'
        >
          Sign In With Google
          <Image src='/icons8-google.svg' alt='Google' width={22} height={22} />
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-2 right-2 rounded-full p-2 bg-gray-200 dark:bg-gray-800'
        >
          <X />
        </button>
      </div>
    </dialog>
  );
};

export default AuthModal;
