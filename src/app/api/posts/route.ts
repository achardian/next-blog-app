import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  const { title, imgUrl, content, userId, readCounter, slug } =
    await req.json();

  try {
    const post = await prismadb.post.create({
      data: {
        title,
        imageUrl: imgUrl,
        content,
        userId,
        readCounter,
        slug,
      },
    });

    return NextResponse.json("Post Created!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to create post, Something went wrong!", {
      status: 500,
    });
  }
};
