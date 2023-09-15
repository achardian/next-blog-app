import { Comment, Post, User } from "@prisma/client";

export type PostWithAuthor = Omit<Post, "author"> & {
  author: User;
};

export type CommentWithUser = Omit<Comment, "user"> & {
  user: User;
};

export type PostWithComment = Omit<Post, "author" | "comments"> & {
  author: User;
  comments: CommentWithUser[];
};
