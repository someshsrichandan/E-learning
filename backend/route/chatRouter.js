import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

// Get all conversations for current user
router.get("/conversations", authMiddleware(["ADMIN", "FACULTY", "STUDENT"]), async (req, res) => {
  try {
    const conversations = await chatController.getConversationsForUser(req.user.id);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get or create conversation with specific user
router.get("/conversations/:userId", authMiddleware(["ADMIN", "FACULTY", "STUDENT"]), async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    // Validate conversation participants
    const otherUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if current user is allowed to message this user
    if (req.user.role === "STUDENT" && otherUser.role !== "FACULTY") {
      return res.status(403).json({ error: "Students can only message faculty" });
    }

    const conversation = await chatController.getOrCreateConversation(currentUserId, userId);
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages in a conversation
router.get("/conversations/:conversationId/messages", authMiddleware(["ADMIN", "FACULTY", "STUDENT"]), async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Verify user is part of this conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId }
    });

    if (!conversation || 
        (conversation.participant1Id !== userId && conversation.participant2Id !== userId)) {
      return res.status(403).json({ error: "Not authorized to view this conversation" });
    }

    // Mark messages as read
    await chatController.markMessagesAsRead(conversationId, userId);

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      include: {
        sender: true,
        receiver: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;