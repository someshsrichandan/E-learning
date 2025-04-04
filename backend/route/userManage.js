import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';
import dotenv from 'dotenv';
import { authMiddleware } from '../middlewares/authMiddleware.js';

dotenv.config();

const userManagementRouter = express.Router();

// ✅ Promote STUDENT to FACULTY (Admin only)
userManagementRouter.put(
  '/promote-user/:userId',
  authMiddleware(['ADMIN']),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { newRole } = req.body;

      if (!['FACULTY'].includes(newRole)) {
        return res
          .status(400)
          .json({ error: 'Invalid role. Only FACULTY promotion is allowed.' });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role !== 'STUDENT') {
        return res
          .status(400)
          .json({ error: 'Only STUDENTs can be promoted to FACULTY' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });

      res
        .status(200)
        .json({ message: 'User promoted successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Create a new user (STUDENT or FACULTY) (Admin only)
userManagementRouter.post(
  '/',
  authMiddleware(['ADMIN']),
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!['STUDENT', 'FACULTY'].includes(role)) {
        return res
          .status(400)
          .json({ error: 'Role must be STUDENT or FACULTY only.' });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      res
        .status(201)
        .json({ message: 'User created successfully', user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Get all STUDENT and FACULTY users (Admin only)
userManagementRouter.get(
  '/users',
  authMiddleware(['ADMIN']),
  async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: {
            in: ['STUDENT', 'FACULTY'],
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Delete user by ID (Admin only)
userManagementRouter.delete(
  '/:id',
  authMiddleware(['ADMIN']),
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await prisma.user.delete({ where: { id } });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default userManagementRouter;
