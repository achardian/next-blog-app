import { Banner, PostCard } from "@/components";
import { PostWithAuthor } from "@/types";
import { Post } from "@prisma/client";
import { headers } from "next/headers";

const getPosts = async () => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/posts`);
  const data = await res.json();

  return data.posts;
};

const Home = async () => {
  const posts: PostWithAuthor[] = await getPosts();

  return (
    <div>
      <div className='wrapper flex flex-col md:flex-row px-3 mt-5 gap-5'>
        <div className='flex-1'>
          <Banner />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className='w-1/3'>side content</div>
      </div>
    </div>
  );
};

export default Home;
