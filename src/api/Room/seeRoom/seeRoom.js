import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      const rooms = await prisma
        .user({ id: user.id })
        .rooms({ where: { id } })
        .$fragment(ROOM_FRAGMENT);
      if (rooms.length === 0) {
        throw Error("Can't find the room");
      } else {
        return rooms[0];
      }
    }
  }
};
