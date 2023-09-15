import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  const {
    title,
    imgUrl,
    content,
    description,
    tags,
    userId,
    readCounter,
    slug,
  } = await req.json();

  try {
    const post = await prismadb.post.create({
      data: {
        title,
        imageUrl: imgUrl,
        content,
        description,
        tags,
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

export const GET = async () => {
  try {
    const posts = await prismadb.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(err.message, { status: 500 });
  }
};
