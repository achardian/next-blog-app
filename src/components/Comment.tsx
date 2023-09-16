import { CommentWithUser } from "@/types";
import { CommentForm } from ".";
import Image from "next/image";
import moment from "moment";

const Comment = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: string;
}) => {
  return (
    <div className='w-3/4 mx-auto mt-3 py-3'>
      <h2>Comments</h2>
      <div className='flex flex-col gap-2 mt-3'>
        {comments.reverse().map((comment) => (
          <div className='border border-gray-300 dark:border-gray-600 rounded-md p-3'>
            <div className='flex items-center gap-2'>
              <Image
                src={comment.user.image as string}
                alt='user-img'
                width={30}
                height={30}
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <p>{comment.user.name}</p>
                <small>{moment(comment.createdAt).fromNow()}</small>
              </div>
            </div>
            <p className='mt-3'>{comment.comment}</p>
          </div>
        ))}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};

export default Comment;
