import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "../config/prismaClient.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";
import { minioClient } from "../config/minio.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// MinIO setup (same as before)


// Ensure buckets exist
async function ensureBuckets() {
  const buckets = ['courses', 'videos', 'documents'];
  for (const bucket of buckets) {
    try {
      const exists = await minioClient.bucketExists(bucket);
      if (!exists) await minioClient.makeBucket(bucket, 'us-east-1');
    } catch (err) {
      console.error(`Error ensuring bucket ${bucket}:`, err);
    }
  }
}
ensureBuckets();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }
});

async function uploadToMinIO(file, bucket, folder = "") {
  const ext = path.extname(file.originalname);
  const filename = folder ? `${folder}/${uuidv4()}${ext}` : `${uuidv4()}${ext}`;
  await minioClient.putObject(bucket, filename, file.buffer, {
    'Content-Type': file.mimetype,
    'Original-Filename': file.originalname
  });
  return `${process.env.MINIO_PUBLIC_URL || `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`}/${bucket}/${filename}`;
}

// ------------------------- COURSE MANAGEMENT ----------------------------

// Create main course (with thumbnail)
router.post("/", 
  authMiddleware(["FACULTY"]),
  upload.single('thumbnail'),
  async (req, res) => {
    try {
      const { title, description, category } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ error: "Thumbnail is required" });
      }

      // Validate thumbnail
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Only JPG, PNG, or WEBP images allowed" });
      }

      const thumbnailUrl = await uploadToMinIO(req.file, "courses");

      const course = await prisma.course.create({
        data: {
          title,
          description,
          category,
          thumbnailUrl,
          facultyId: req.user.id,
          status: 'DRAFT' // Can be DRAFT, PUBLISHED, ARCHIVED
        }
      });

      res.status(201).json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update course details
router.put("/:id", 
  authMiddleware(["FACULTY"]),
  upload.single('thumbnail'),
  async (req, res) => {
    try {
      const { title, description, category, status } = req.body;
      const courseId = req.params.id;
      
      let thumbnailUrl;
      if (req.file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
          return res.status(400).json({ error: "Invalid thumbnail format" });
        }
        thumbnailUrl = await uploadToMinIO(req.file, "courses");
      }

      const updated = await prisma.course.update({
        where: { id: courseId },
        data: {
          title,
          description,
          category,
          status,
          ...(thumbnailUrl && { thumbnailUrl })
        }
      });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Get course with all details
router.get("/:id", authMiddleware(["FACULTY", "STUDENT"]), async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        faculty: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        videos: {
          orderBy: { position: 'asc' },
          include: {
            comments: {
              take: 3,
              orderBy: { createdAt: 'desc' },
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    role: true
                  }
                }
              }
            }
          }
        },
        comments: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true
              }
            }
          }
        },
        _count: {
          select: {
            videos: true,
            comments: true
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------- VIDEO MANAGEMENT ----------------------------

// Add video to course
router.post("/:id/videos",
  authMiddleware(["FACULTY"]),
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'resources', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const { title, description, position } = req.body;
      const courseId = req.params.id;

      if (!req.files.video) {
        return res.status(400).json({ error: "Video file is required" });
      }

      // Validate video
      const allowedVideoTypes = ['video/mp4', 'video/webm'];
      if (!allowedVideoTypes.includes(req.files.video[0].mimetype)) {
        return res.status(400).json({ error: "Invalid video format" });
      }

      const videoUrl = await uploadToMinIO(req.files.video[0], "videos", `course_${courseId}`);

      // Handle resources
      let resources = [];
      if (req.files.resources) {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        for (const file of req.files.resources) {
          if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: `Invalid file type: ${file.originalname}` });
          }
          const url = await uploadToMinIO(file, "documents", `course_${courseId}`);
          resources.push({
            name: file.originalname,
            url,
            type: file.mimetype
          });
        }
      }

      const video = await prisma.video.create({
        data: {
          title,
          description,
          position: position ? parseInt(position) : 0,  // ✅ FIXED
          url: videoUrl,
          resources: resources.length > 0 ? JSON.stringify(resources) : null,
          courseId
        }
      });

      res.status(201).json(video);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update video details
router.put("/videos/:id",
  authMiddleware(["FACULTY"]),
  upload.fields([
    { name: 'resources', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const { title, description, position } = req.body;
      const videoId = req.params.id;

      const existingVideo = await prisma.video.findUnique({
        where: { id: videoId }
      });

      if (!existingVideo) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Handle new resources
      let resources = existingVideo.resources ? JSON.parse(existingVideo.resources) : [];
      if (req.files.resources) {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        for (const file of req.files.resources) {
          if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: `Invalid file type: ${file.originalname}` });
          }
          const url = await uploadToMinIO(file, "documents", `course_${existingVideo.courseId}`);
          resources.push({
            name: file.originalname,
            url,
            type: file.mimetype
          });
        }
      }

      const updated = await prisma.video.update({
        where: { id: videoId },
        data: {
          title,
          description,
          position: position ? parseInt(position) : undefined,
          resources: JSON.stringify(resources)
        }
      });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ------------------------- COMMENT SYSTEM ----------------------------

// Course-level comment
router.post("/:id/comments",
  authMiddleware(["FACULTY", "STUDENT"]),
  async (req, res) => {
    try {
      const { content } = req.body;
      const courseId = req.params.id;

      if (!content || content.trim().length < 5) {
        return res.status(400).json({ error: "Comment must be at least 5 characters" });
      }

      const comment = await prisma.courseComment.create({
        data: {
          content,
          courseId,
          userId: req.user.id
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });

      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Video-level comment
router.post("/videos/:id/comments",
  authMiddleware(["FACULTY", "STUDENT"]),
  async (req, res) => {
    try {
      const { content } = req.body;
      const videoId = req.params.id;

      if (!content || content.trim().length < 5) {
        return res.status(400).json({ error: "Comment must be at least 5 characters" });
      }

      // Verify video exists
      const video = await prisma.video.findUnique({
        where: { id: videoId }
      });

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      const comment = await prisma.videoComment.create({
        data: {
          content,
          videoId,
          userId: req.user.id
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });

      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Get course comments with pagination
router.get("/:id/comments",
  authMiddleware(["FACULTY", "STUDENT"]),
  async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const comments = await prisma.courseComment.findMany({
        where: { courseId: req.params.id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });

      const total = await prisma.courseComment.count({
        where: { courseId: req.params.id }
      });

      res.json({
        data: comments,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: skip + comments.length < total
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Get video comments with pagination
router.get("/videos/:id/comments",
  authMiddleware(["FACULTY", "STUDENT"]),
  async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const comments = await prisma.videoComment.findMany({
        where: { videoId: req.params.id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });

      const total = await prisma.videoComment.count({
        where: { videoId: req.params.id }
      });

      res.json({
        data: comments,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: skip + comments.length < total
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


// ------------------------- COURSE MANAGEMENT ----------------------------

// 1. Course Rating System
router.post("/:id/rate", authMiddleware(["STUDENT"]), async (req, res) => {
    try {
      const { rating } = req.body;
      const courseId = req.params.id;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }
  
      // Check if student already rated
      const existingRating = await prisma.courseRating.findFirst({
        where: {
          courseId,
          userId: req.user.id
        }
      });
  
      let result;
      if (existingRating) {
        result = await prisma.courseRating.update({
          where: { id: existingRating.id },
          data: { rating }
        });
      } else {
        result = await prisma.courseRating.create({
          data: {
            rating,
            courseId,
            userId: req.user.id
          }
        });
      }
  
      // Calculate new average rating
      const aggregate = await prisma.courseRating.aggregate({
        where: { courseId },
        _avg: { rating: true },
        _count: { rating: true }
      });
  
      await prisma.course.update({
        where: { id: courseId },
        data: {
          averageRating: aggregate._avg.rating,
          ratingCount: aggregate._count.rating
        }
      });
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get faculty average rating
  router.get("/faculty/:id/rating", async (req, res) => {
    try {
      const facultyId = req.params.id;
      
      const aggregate = await prisma.courseRating.aggregate({
        where: {
          course: { facultyId }
        },
        _avg: { rating: true },
        _count: { rating: true }
      });
  
      res.json({
        averageRating: aggregate._avg.rating,
        totalRatings: aggregate._count.rating
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 2. Delete Course (with all related videos)
  router.delete("/:id", authMiddleware(["FACULTY", "ADMIN"]), async (req, res) => {
    try {
      const courseId = req.params.id;
  
      // Verify course ownership (unless admin)
      if (req.user.role !== "ADMIN") {
        const course = await prisma.course.findUnique({
          where: { id: courseId }
        });
        if (course.facultyId !== req.user.id) {
          return res.status(403).json({ error: "Not authorized to delete this course" });
        }
      }
  
      // Get all videos to delete their files
      const videos = await prisma.video.findMany({
        where: { courseId }
      });
  
      // Delete videos and their files
      for (const video of videos) {
        // Delete video file from MinIO
        const videoKey = video.url.split('/').slice(4).join('/');
        await minioClient.removeObject("videos", videoKey);
  
        // Delete resources
        if (video.resources) {
          const resources = JSON.parse(video.resources);
          for (const resource of resources) {
            const resourceKey = resource.url.split('/').slice(4).join('/');
            await minioClient.removeObject("documents", resourceKey);
          }
        }
      }
  
      // Delete course thumbnail
      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });
      if (course.thumbnailUrl) {
        const thumbnailKey = course.thumbnailUrl.split('/').slice(4).join('/');
        await minioClient.removeObject("courses", thumbnailKey);
      }
  
      // Delete from database (cascading delete will handle related records)
      await prisma.course.delete({
        where: { id: courseId }
      });
  
      res.json({ message: "Course and all related content deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete video
  router.delete("/videos/:id", authMiddleware(["FACULTY"]), async (req, res) => {
    try {
      const videoId = req.params.id;
  
      // Verify video ownership
      const video = await prisma.video.findUnique({
        where: { id: videoId },
        include: { course: true }
      });
  
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
  
      if (video.course.facultyId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to delete this video" });
      }
  
      // Delete video file from MinIO
      const videoKey = video.url.split('/').slice(4).join('/');
      await minioClient.removeObject("videos", videoKey);
  
      // Delete resources
      if (video.resources) {
        const resources = JSON.parse(video.resources);
        for (const resource of resources) {
          const resourceKey = resource.url.split('/').slice(4).join('/');
          await minioClient.removeObject("documents", resourceKey);
        }
      }
  
      // Delete from database
      await prisma.video.delete({
        where: { id: videoId }
      });
  
      res.json({ message: "Video deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 3. Nested Comments (Replies)
  router.post("/comments/:id/reply", authMiddleware(["FACULTY", "STUDENT"]), async (req, res) => {
    try {
      const { content } = req.body;
      const parentId = req.params.id;
  
      if (!content || content.trim().length < 5) {
        return res.status(400).json({ error: "Reply must be at least 5 characters" });
      }
  
      // Verify parent comment exists
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      });
  
      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found" });
      }
  
      const reply = await prisma.comment.create({
        data: {
          content,
          userId: req.user.id,
          parentId,
          // Copy the context from parent (courseId or videoId)
          ...(parentComment.courseId && { courseId: parentComment.courseId }),
          ...(parentComment.videoId && { videoId: parentComment.videoId })
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });
  
      res.status(201).json(reply);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get comment with replies
  router.get("/comments/:id", async (req, res) => {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true
                }
              }
            },
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      });
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      res.json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 4. Faculty Course Count
  router.get("/faculty/:id/count", async (req, res) => {
    try {
      const facultyId = req.params.id;
  
      const count = await prisma.course.count({
        where: { facultyId }
      });
  
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 5. Video Position Management
  router.put("/videos/:id/position", authMiddleware(["FACULTY"]), async (req, res) => {
    try {
      const { position } = req.body;
      const videoId = req.params.id;
  
      if (position === undefined || position < 0) {
        return res.status(400).json({ error: "Invalid position value" });
      }
  
      // Get current video
      const video = await prisma.video.findUnique({
        where: { id: videoId },
        include: { course: true }
      });
  
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
  
      // Verify ownership
      if (video.course.facultyId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to modify this video" });
      }
  
      // Get all videos in course
      const videos = await prisma.video.findMany({
        where: { courseId: video.courseId },
        orderBy: { position: 'asc' }
      });
  
      // Validate position
      if (position >= videos.length) {
        return res.status(400).json({ error: "Position exceeds video count" });
      }
  
      // Update positions
      const updatedVideos = [];
      let currentPos = 0;
  
      for (let i = 0; i < videos.length; i++) {
        if (i === position) {
          // Skip the position we're moving to
          currentPos++;
        }
  
        if (videos[i].id === videoId) {
          // This is the video we're moving
          updatedVideos.push(
            prisma.video.update({
              where: { id: videoId },
              data: { position }
            })
          );
        } else {
          if (currentPos === position) {
            // Skip the position we're moving to
            currentPos++;
          }
          updatedVideos.push(
            prisma.video.update({
              where: { id: videos[i].id },
              data: { position: currentPos }
            })
          );
          currentPos++;
        }
      }
  
      await prisma.$transaction(updatedVideos);
  
      res.json({ message: "Video position updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 6. Enhanced Course Details
  router.put("/:id/details", authMiddleware(["FACULTY"]), async (req, res) => {
    try {
      const { about, learnings, requirements } = req.body;
      const courseId = req.params.id;
  
      // Verify ownership
      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      if (course.facultyId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to modify this course" });
      }
  
      const updated = await prisma.course.update({
        where: { id: courseId },
        data: {
          about,
          learnings: learnings ? JSON.parse(learnings) : null,
          requirements: requirements ? JSON.parse(requirements) : null
        }
      });
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 7. Assignment Management
  router.post("/videos/:id/assignments",
    authMiddleware(["FACULTY"]),
    upload.fields([
      { name: 'file', maxCount: 1 },
      { name: 'resources', maxCount: 5 }
    ]),
    async (req, res) => {
      try {
        const { title, description, deadline } = req.body;
        const videoId = req.params.id;
  
        // Verify video and ownership
        const video = await prisma.video.findUnique({
          where: { id: videoId },
          include: { course: true }
        });
  
        if (!video) {
          return res.status(404).json({ error: "Video not found" });
        }
  
        if (video.course.facultyId !== req.user.id) {
          return res.status(403).json({ error: "Not authorized to add assignments to this video" });
        }
  
        let fileUrl = null;
        if (req.files.file) {
          const allowedTypes = ['application/pdf'];
          if (!allowedTypes.includes(req.files.file[0].mimetype)) {
            return res.status(400).json({ error: "Only PDF files are allowed" });
          }
          fileUrl = await uploadToMinIO(req.files.file[0], "assignments", `video_${videoId}`);
        }
  
        // Handle resources
        let resources = [];
        if (req.files.resources) {
          const allowedTypes = ['application/pdf'];
          for (const file of req.files.resources) {
            if (!allowedTypes.includes(file.mimetype)) {
              return res.status(400).json({ error: `Invalid file type: ${file.originalname}` });
            }
            const url = await uploadToMinIO(file, "documents", `assignment_${videoId}`);
            resources.push({
              name: file.originalname,
              url,
              type: file.mimetype
            });
          }
        }
  
        const assignment = await prisma.assignment.create({
          data: {
            title,
            description,
            deadline: new Date(deadline),
            fileUrl,
            resources: resources.length > 0 ? JSON.stringify(resources) : null,
            videoId,
            courseId: video.courseId
          }
        });
  
        res.status(201).json(assignment);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );
  
  // 8. Quiz Management
  router.post("/videos/:id/quizzes", authMiddleware(["FACULTY"]), async (req, res) => {
    try {
      const { title, questions, timeLimit } = req.body;
      const videoId = req.params.id;
  
      // Verify video and ownership
      const video = await prisma.video.findUnique({
        where: { id: videoId },
        include: { course: true }
      });
  
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
  
      if (video.course.facultyId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to add quizzes to this video" });
      }
  
      // Validate questions
      if (!Array.isArray(questions)) {
        return res.status(400).json({ error: "Questions must be an array" });
      }
  
      for (const q of questions) {
        if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length < 2 || q.correctAnswer === undefined) {
          return res.status(400).json({ error: "Each question must have question text, options (min 2), and correctAnswer" });
        }
      }
  
      const quiz = await prisma.quiz.create({
        data: {
          title,
          questions: JSON.stringify(questions),
          timeLimit: timeLimit ? parseInt(timeLimit) : null,
          videoId,
          courseId: video.courseId
        }
      });
  
      res.status(201).json(quiz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Submit quiz answers
  router.post("/quizzes/:id/submit", authMiddleware(["STUDENT"]), async (req, res) => {
    try {
      const { answers } = req.body;
      const quizId = req.params.id;
  
      // Verify quiz exists
      const quiz = await prisma.quiz.findUnique({
        where: { id: quizId }
      });
  
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      // Check if already submitted
      const existingResult = await prisma.quizResult.findFirst({
        where: {
          quizId,
          studentId: req.user.id
        }
      });
  
      if (existingResult) {
        return res.status(400).json({ error: "You have already submitted this quiz" });
      }
  
      // Calculate score
      const questions = JSON.parse(quiz.questions);
      let score = 0;
      const detailedResults = [];
  
      for (let i = 0; i < questions.length; i++) {
        const isCorrect = answers[i] === questions[i].correctAnswer;
        if (isCorrect) score++;
        
        detailedResults.push({
          question: questions[i].question,
          options: questions[i].options,
          userAnswer: answers[i],
          correctAnswer: questions[i].correctAnswer,
          isCorrect
        });
      }
  
      const result = await prisma.quizResult.create({
        data: {
          score,
          totalQuestions: questions.length,
          details: JSON.stringify(detailedResults),
          quizId,
          studentId: req.user.id
        }
      });
  
      res.status(201).json({
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        details: detailedResults
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;