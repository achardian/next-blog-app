import { Post, User } from "@prisma/client";

export type PostWithAuthor = Omit<Post, "author"> & {
  author: User;
};
