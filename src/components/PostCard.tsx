import { PostWithAuthor } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }: { post: PostWithAuthor }) => {
  return (
    <div className='w-full border border-gray-200 dark:border-gray-600 mb-3 rounded-lg p-5 flex flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <Image
          src={post.author.image as string}
          alt='user-img'
          width={40}
          height={40}
          className='rounded-full'
        />
        <div className='flex flex-col'>
          <Link
            href={`/profile/${post.author.id}`}
            className='font-semibold tracking-wide'
          >
            {post.author.name}
          </Link>
          <small className='text-gray-700 dark:text-gray-300'>
            {moment(post.createdAt).format("LL")}
          </small>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-between gap-3'>
        <div>
          <Link href={`/post/${post.slug}`} className='font-bold'>
            {post.title}
          </Link>
          <div
            className='hidden lg:block'
            dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) }}
          ></div>
        </div>
        <div className='w-full h-[300px] lg:w-[30%] lg:h-[120px] relative'>
          <Image
            src={post.imageUrl}
            alt='image'
            fill
            className='object-cover rounded-md'
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PostCard;
