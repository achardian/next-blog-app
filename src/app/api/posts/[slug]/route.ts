import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const post = await prismadb.post.findFirst({
      where: {
        slug: params.slug,
      },
      include: {
        author: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
