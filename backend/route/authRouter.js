// authRouter.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';// note: add `.js` extension for ES Modules
import dotenv from 'dotenv';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import { minioClient } from '../config/minio.js';
import path from "path"
import { v4 as uuidv4 } from 'uuid';
 // Importing uuid for unique filenames

dotenv.config();

const authRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Ensure profile pictures bucket exists
async function ensureProfilePicturesBucket() {
  try {
    const exists = await minioClient.bucketExists('profile-pictures');
    if (!exists) await minioClient.makeBucket('profile-pictures', 'us-east-1');
  } catch (err) {
    console.error("Error ensuring profile-pictures bucket:", err);
  }
}
ensureProfilePicturesBucket();


async function uploadToMinIO(file, bucket, folder = "") {
  const ext = path.extname(file.originalname);
  const filename = folder ? `${folder}/${uuidv4()}${ext}` : `${uuidv4()}${ext}`;
  await minioClient.putObject(bucket, filename, file.buffer, {
    'Content-Type': file.mimetype,
    'Original-Filename': file.originalname
  });
  return `${process.env.MINIO_PUBLIC_URL}/${bucket}/${filename}`;
}
// Middleware to authenticate and authorize based on rol

// Public Signup (Only allows student registration)
authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
        role: 'STUDENT',
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Admin-only User Creation (ADMIN/FACULTY)


// Login Route
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

    res.status(200).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

authRouter.put("/profile", 
  authMiddleware(["ADMIN", "FACULTY", "STUDENT"]),
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phone, age, address, college, about } = req.body;

      let profilePictureUrl;
      if (req.file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
          return res.status(400).json({ error: "Only JPG, PNG, or WEBP images allowed" });
        }
        profilePictureUrl = await uploadToMinIO(req.file, "profile-pictures");
      }

      const dataToUpdate = {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(college && { college }),
        ...(about && { about }),
        ...(age && { age: parseInt(age) }),
        ...(profilePictureUrl && { profilePicture: profilePictureUrl })
      };

      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update." });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: dataToUpdate,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          age: true,
          address: true,
          college: true,
          about: true,
          profilePicture: true
        }
      });

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
// Get user profile
authRouter.get("/profile", authMiddleware(["ADMIN", "FACULTY", "STUDENT"]), async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        age: true,
        address: true,
        college: true,
        about: true,
        profilePicture: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout Route
authRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

export default authRouter;
