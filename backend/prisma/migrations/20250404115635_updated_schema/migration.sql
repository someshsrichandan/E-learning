/*
  Warnings:

  - You are about to drop the column `additionalMaterials` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `passingScore` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `passed` on the `QuizResult` table. All the data in the column will be lost.
  - You are about to drop the `CourseComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoComment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseComment" DROP CONSTRAINT "CourseComment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseComment" DROP CONSTRAINT "CourseComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoComment" DROP CONSTRAINT "VideoComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoComment" DROP CONSTRAINT "VideoComment_videoId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "additionalMaterials",
DROP COLUMN "instructions",
ADD COLUMN     "resources" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoId" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "fileUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "about" TEXT,
ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "learnings" JSONB,
ADD COLUMN     "ratingCount" INTEGER DEFAULT 0,
ADD COLUMN     "requirements" JSONB;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "passingScore",
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "QuizResult" DROP COLUMN "passed";

-- DropTable
DROP TABLE "CourseComment";

-- DropTable
DROP TABLE "VideoComment";

-- CreateTable
CREATE TABLE "CourseRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" TEXT,
    "videoId" TEXT,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseRating" ADD CONSTRAINT "CourseRating_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRating" ADD CONSTRAINT "CourseRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
