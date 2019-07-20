import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, roomId } = args;
      let { toId } = args;
      const { user } = request;
      if (toId === user.id) throw Error("Can't send to myself");

      let room;
      if (roomId === undefined) {
        room = await prisma.createRoom({
          participants: {
            connect: [{ id: user.id }, { id: toId }]
          }
        });
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
        toId = room.participants.find(participant => participant.id !== user.id)
          .id;
      }

      return prisma.createMessage({
        text,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: toId }
        },
        room: {
          connect: { id: room.id }
        }
      });
    }
  }
};
