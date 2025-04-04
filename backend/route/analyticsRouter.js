import express from "express";
import prisma from "../config/prismaClient.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const analyticsRouter = express.Router();

// Admin analytics dashboard
analyticsRouter.get("/admin", authMiddleware(["ADMIN"]), async (req, res) => {
  try {
    // Get total counts
    const [users, courses, faculties, students] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.user.count({ where: { role: "FACULTY" } }),
      prisma.user.count({ where: { role: "STUDENT" } })
    ]);

    // Get course enrollment statistics
    const popularCourses = await prisma.course.findMany({
      take: 5,
      orderBy: {
        ratings: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: {
            ratings: true
          }
        },
        faculty: {
          select: {
            name: true
          }
        }
      }
    });

    // Get recent activities
    const recentActivities = await prisma.courseRating.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        course: {
          select: {
            title: true
          }
        }
      }
    });

    res.json({
      summary: {
        totalUsers: users,
        totalCourses: courses,
        totalFaculties: faculties,
        totalStudents: students
      },
      popularCourses,
      recentActivities
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Faculty analytics
analyticsRouter.get("/faculty", authMiddleware(["FACULTY"]), async (req, res) => {
  try {
    const facultyId = req.user.id;

    // Get faculty courses with stats
    const courses = await prisma.course.findMany({
      where: { facultyId },
      include: {
        _count: {
          select: {
            ratings: true,
            videos: true,
            assignments: true
          }
        },
        ratings: {
          select: {
            rating: true
          }
        }
      }
    });

    // Calculate average ratings
    const coursesWithStats = courses.map(course => {
      const avgRating = course.ratings.length > 0 
        ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length
        : 0;
      
      return {
        ...course,
        averageRating: avgRating.toFixed(1),
        ratings: undefined // Remove the raw ratings data
      };
    });

    // Get assignment submissions
    const recentSubmissions = await prisma.submission.findMany({
      where: {
        assignment: {
          course: {
            facultyId
          }
        }
      },
      take: 10,
      orderBy: {
        submittedAt: 'desc'
      },
      include: {
        assignment: {
          select: {
            title: true
          }
        },
        student: {
          select: {
            name: true
          }
        }
      }
    });

    res.json({
      courses: coursesWithStats,
      recentSubmissions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default analyticsRouter;