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
        saveIds: {
          push: userId,
        },
      },
    });

    return NextResponse.json("Added to bookmark!", { status: 201 });
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
        saveIds: post?.saveIds.filter((saveId) => saveId !== userId),
      },
    });

    return NextResponse.json("Remove from bookmarks", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
