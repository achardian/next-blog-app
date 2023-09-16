"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const LikeButton = ({ likes, postId }: { likes: string[]; postId: string }) => {
  const { data: session } = useSession();
  const isLiked = likes.includes(session?.user.id as string);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch("/api/posts/favorites", {
        method: isLiked ? "DELETE" : "PUT",
        body: JSON.stringify({
          userId: session?.user.id,
          postId,
        }),
        cache: "no-cache",
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to like this post!", { duration: 3000 });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-3 rounded-full flex items-center gap-2 ${
        isLiked ? "text-red-600" : "text-gray-500"
      }`}
    >
      <Heart fill={isLiked ? "#C51605" : "none"} width={23} height={23} />
      {likes.length > 0 && (
        <small className='text-gray-900 dark:text-gray-50'>
          {likes.length}
        </small>
      )}
    </button>
  );
};

export default LikeButton;
