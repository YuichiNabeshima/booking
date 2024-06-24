/*
  Warnings:

  - The `end` column on the `booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `start` on the `booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "start",
ADD COLUMN     "start" VARCHAR(10) NOT NULL,
DROP COLUMN "end",
ADD COLUMN     "end" VARCHAR(10);
