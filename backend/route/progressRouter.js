import express from "express";
import prisma from "../config/prismaClient.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const progressRouter = express.Router();

// Get student's enrolled courses with progress
progressRouter.get("/courses", authMiddleware(["STUDENT"]), async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get courses where student has submitted assignments or taken quizzes
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { assignments: { some: { submissions: { some: { studentId } } } } },
          { quizzes: { some: { results: { some: { studentId } } } } }
        ]
      },
      include: {
        faculty: {
          select: {
            name: true
          }
        },
        assignments: {
          where: {
            submissions: {
              some: { studentId }
            }
          },
          include: {
            submissions: {
              where: { studentId },
              orderBy: {
                submittedAt: 'desc'
              },
              take: 1
            }
          }
        },
        quizzes: {
          where: {
            results: {
              some: { studentId }
            }
          },
          include: {
            results: {
              where: { studentId },
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        },
        _count: {
          select: {
            assignments: true,
            quizzes: true,
            videos: true
          }
        }
      }
    });

    // Calculate progress for each course
    const coursesWithProgress = courses.map(course => {
      const completedAssignments = course.assignments.length;
      const completedQuizzes = course.quizzes.length;
      
      const totalAssignments = course._count.assignments;
      const totalQuizzes = course._count.quizzes;
      
      const assignmentProgress = totalAssignments > 0 
        ? (completedAssignments / totalAssignments) * 100 
        : 0;
      
      const quizProgress = totalQuizzes > 0 
        ? (completedQuizzes / totalQuizzes) * 100 
        : 0;
      
      const overallProgress = Math.round(
        (assignmentProgress + quizProgress) / 
        ((totalAssignments > 0 ? 1 : 0) + (totalQuizzes > 0 ? 1 : 0)) || 0
      );

      return {
        ...course,
        progress: {
          overall: overallProgress,
          assignments: Math.round(assignmentProgress),
          quizzes: Math.round(quizProgress),
          videosWatched: 0 // Can be implemented with video tracking
        },
        assignments: undefined,
        quizzes: undefined,
        _count: undefined
      };
    });

    res.json(coursesWithProgress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get detailed progress for a specific course
progressRouter.get("/courses/:courseId", authMiddleware(["STUDENT"]), async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        faculty: {
          select: {
            name: true
          }
        },
        videos: {
          orderBy: {
            position: 'asc'
          },
          include: {
            assignments: {
              include: {
                submissions: {
                  where: { studentId },
                  orderBy: {
                    submittedAt: 'desc'
                  },
                  take: 1
                }
              }
            },
            quizzes: {
              include: {
                results: {
                  where: { studentId },
                  orderBy: {
                    createdAt: 'desc'
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Calculate progress for each video
    const videosWithProgress = course.videos.map(video => {
      const assignmentCompleted = video.assignments.some(a => a.submissions.length > 0);
      const quizCompleted = video.quizzes.some(q => q.results.length > 0);
      
      return {
        ...video,
        assignmentCompleted,
        quizCompleted,
        lastSubmission: video.assignments[0]?.submissions[0]?.submittedAt,
        quizScore: video.quizzes[0]?.results[0]?.score
      };
    });

    res.json({
      ...course,
      videos: videosWithProgress
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default progressRouter;