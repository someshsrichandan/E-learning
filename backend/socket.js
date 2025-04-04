import { Server } from "socket.io";
import prisma from "./config/prismaClient.js";
import * as chatController from "./controller/chatController.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"]
    }
  });

  // Map to store user ID to socket ID mappings
  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Store socket ID when user authenticates
    socket.on("authenticate", (userId) => {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ${socket.id}`);
    });

    // Handle new messages
    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
      try {
        // Get or create conversation
        const conversation = await chatController.getOrCreateConversation(senderId, receiverId);

        // Create message
        const [message] = await chatController.createMessage(
          senderId,
          receiverId,
          conversation.id,
          content
        );

        // Emit to sender
        socket.emit("newMessage", message);

        // Emit to receiver if online
        const receiverSocketId = userSocketMap.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", message);
        }
      } catch (err) {
        console.error("Error sending message:", err);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      // Remove user from mapping
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};