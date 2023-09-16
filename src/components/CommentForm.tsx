"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from ".";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CommentForm = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts/comments", {
        method: "POST",
        body: JSON.stringify({ userId: session?.user.id, comment, postId }),
      });
      const data = await res.json();
      setComment("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to post a comment!", { duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-5 px-1 border border-gray-200 dark:border-gray-600 rounded-md flex items-start gap-3'
    >
      <Image
        src={session?.user.image as string}
        alt='user-img'
        width={40}
        height={40}
        className='rounded-full'
      />
      <div className='w-full'>
        <textarea
          className='py-1 px-3 w-full outline-none border-none bg-gray-300/20 rounded-md min-h-[120px]'
          placeholder='Write a thoughtful comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <Button
          text='Send'
          className='bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-md'
        />
      </div>
    </form>
  );
};

export default CommentForm;
