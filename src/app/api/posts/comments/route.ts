import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId, comment, postId } = await req.json();

  try {
    await prismadb.comment.create({
      data: {
        postId,
        userId,
        comment,
      },
    });

    return NextResponse.json("Comment created!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to post comment!", { status: 500 });
  }
};
