import { headers } from "next/headers";

const getPostDetail = async (slug: string) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/posts/${slug}`);
  const data = await res.json();

  return data;
};

const PostDetail = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostDetail(params.slug);
  console.log(post);

  return <div className='wrapper px-3'></div>;
};

export default PostDetail;
