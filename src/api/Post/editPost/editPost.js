import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        switch (action) {
          case EDIT:
            return prisma.updatePost({
              data: { caption, location },
              where: { id }
            });
          case DELETE:
            return prisma.deletePost({ id });
          default:
            break;
        }
      } else {
        throw Error("YOU Can't do that");
      }
    }
  }
};
