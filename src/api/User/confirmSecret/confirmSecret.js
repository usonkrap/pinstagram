import { prisma } from "../../../../generated/prisma-client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (secret === user.loginSecret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: "" }
        });
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
