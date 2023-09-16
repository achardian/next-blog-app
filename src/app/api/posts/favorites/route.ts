import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const { userId, postId } = await req.json();
  try {
    const post = await prismadb.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          push: userId,
        },
      },
    });

    return NextResponse.json("Liked!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const { userId, postId } = await req.json();
  try {
    const post = await prismadb.post.findFirst({
      where: {
        id: postId,
      },
    });

    await prismadb.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: post?.likes.filter((likeId) => likeId !== userId),
      },
    });

    return NextResponse.json("Liked!", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
