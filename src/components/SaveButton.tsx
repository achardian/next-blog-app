"use client";

import { BookmarkPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SaveButton = ({
  postId,
  saveIds,
}: {
  postId: string;
  saveIds: string[];
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isSaved = saveIds.includes(session?.user.id as string);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/posts/bookmarks", {
        method: isSaved ? "DELETE" : "PUT",
        body: JSON.stringify({ userId: session?.user.id, postId }),
      });
      const data = await res.json();
      toast.success(data, { duration: 3000 });
      router.refresh();
    } catch (error) {
      toast.error("Save failed!", { duration: 3000 });
    }
  };

  return (
    <button onClick={handleClick}>
      <BookmarkPlus
        fill={isSaved ? "#FFB000" : "none"}
        className={`${isSaved ? "text-yellow-400" : "text-gray-500"}`}
      />
    </button>
  );
};

export default SaveButton;
