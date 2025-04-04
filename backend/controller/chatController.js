import prisma from "../config/prismaClient.js";

export const getOrCreateConversation = async (user1Id, user2Id) => {
  // Check if conversation already exists in either order
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      OR: [
        { participant1Id: user1Id, participant2Id: user2Id },
        { participant1Id: user2Id, participant2Id: user1Id }
      ]
    },
    include: {
      participant1: true,
      participant2: true,
      messages: {
        orderBy: {
          createdAt: 'asc'
        },
        take: 50
      }
    }
  });

  if (existingConversation) {
    return existingConversation;
  }

  // Create new conversation
  return await prisma.conversation.create({
    data: {
      participant1Id: user1Id,
      participant2Id: user2Id
    },
    include: {
      participant1: true,
      participant2: true,
      messages: true
    }
  });
};

export const getConversationsForUser = async (userId) => {
  return await prisma.conversation.findMany({
    where: {
      OR: [
        { participant1Id: userId },
        { participant2Id: userId }
      ]
    },
    include: {
      participant1: true,
      participant2: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
};

export const createMessage = async (senderId, receiverId, conversationId, content) => {
  return await prisma.$transaction([
    prisma.chatMessage.create({
      data: {
        content,
        senderId,
        receiverId,
        conversationId
      },
      include: {
        sender: true,
        receiver: true
      }
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    })
  ]);
};

export const markMessagesAsRead = async (conversationId, userId) => {
  return await prisma.chatMessage.updateMany({
    where: {
      conversationId,
      receiverId: userId,
      read: false
    },
    data: {
      read: true
    }
  });
};