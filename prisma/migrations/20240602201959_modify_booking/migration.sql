/*
  Warnings:

  - You are about to drop the column `course` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `booking` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "course",
DROP COLUMN "end",
ADD COLUMN     "course_id" INTEGER NOT NULL;
