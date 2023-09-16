import { Comment, LikeButton, SaveButton } from "@/components";
import { PostWithComment } from "@/types";
import { BookOpen, Calendar, MessageCircle } from "lucide-react";
import moment from "moment";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const getPostDetail = async (slug: string) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/posts/${slug}`);
  const data = await res.json();

  return data;
};

const PostDetail = async ({ params }: { params: { slug: string } }) => {
  const post: PostWithComment = await getPostDetail(params.slug);
  const words = post.content.split(" ").length;
  const estimatedReading = Math.round(words / 250);

  return (
    <div className='wrapper px-3'>
      <div className='w-full lg:w-3/4 h-[400px] relative mx-auto my-8'>
        <Image
          src={post.imageUrl}
          alt='image cover'
          fill
          className='object-cover'
        />
      </div>
      <h1 className='text-center text-3xl font-bold'>{post.title}</h1>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-3 mt-6'>
        <div className='flex items-center gap-2'>
          <Image
            src={post.author.image as string}
            alt='user-img'
            width={35}
            height={35}
            className='rounded-full'
          />
          <Link href={`/profile/${post.author.id}`} className='font-semibold'>
            {post.author.name}
          </Link>
        </div>{" "}
        |
        <p className='flex items-center gap-2'>
          <Calendar width={20} height={20} />
          {moment(post.createdAt).format("LL")}
        </p>{" "}
        |
        <p className='flex items-center gap-2'>
          <BookOpen width={20} height={20} />
          {estimatedReading} min
        </p>
      </div>
      <div className='w-3/4 mx-auto my-14 leading-normal content'>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
      <div className='w-3/4 mx-auto my-6 flex items-center gap-3'>
        {post.tags.map((tag) => (
          <Link
            href={`/post?tags=${tag}`}
            key={tag}
            className='py-2 px-3 bg-gray-400 rounded-sm'
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className='w-3/4 mx-auto flex items-center gap-3'>
        <LikeButton likes={post.likes} postId={post.id} />
        <button className='p-3 rounded-full hover:bg-gray-300'>
          <MessageCircle width={25} height={25} />
        </button>
        <SaveButton postId={post.id} saveIds={post.saveIds} />
      </div>
      <Comment comments={post.comments} postId={post.id} />
    </div>
  );
};

export default PostDetail;
