/*
  Warnings:

  - Added the required column `fileUrl` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestions` to the `QuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "additionalMaterials" TEXT,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" TEXT,
ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "passingScore" INTEGER,
ADD COLUMN     "timeLimit" INTEGER,
ALTER COLUMN "questions" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN     "details" TEXT,
ADD COLUMN     "passed" BOOLEAN,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "grade" INTEGER;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "description" TEXT,
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resources" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "VideoComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoComment" ADD CONSTRAINT "VideoComment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoComment" ADD CONSTRAINT "VideoComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseComment" ADD CONSTRAINT "CourseComment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseComment" ADD CONSTRAINT "CourseComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
