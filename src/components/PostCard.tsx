import { PostWithAuthor } from "@/types";
import { Heart, MessageCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { SaveButton } from ".";

const PostCard = ({ post }: { post: PostWithAuthor }) => {
  const tags = post.tags.length > 2 ? post.tags.slice(0, 2) : post.tags;

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
        <div className='flex-1 flex flex-col gap-3'>
          <Link href={`/post/${post.slug}`} className='font-bold text-xl'>
            {post.title}
          </Link>
          <div className='hidden lg:block'>{post.description}</div>
        </div>
        <div className='w-full h-[200px] lg:w-1/3 lg:h-[120px] relative'>
          <Image
            src={post.imageUrl}
            alt='image'
            fill
            className='object-cover rounded-md'
          />
        </div>
      </div>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <Link href={`/post/${post.slug}`}>
            <Heart width={20} height={20} />
          </Link>
          <Link href={`/post/${post.slug}`}>
            <MessageCircle width={20} height={20} />
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          {tags.map((tag) => (
            <Link
              className='bg-gray-200 dark:bg-gray-900 px-3 py-1'
              key={tag}
              href={`/post?tag=${tag.toLowerCase()}`}
            >
              <small>{tag}</small>
            </Link>
          ))}
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
