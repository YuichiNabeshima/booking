/*
  Warnings:

  - Added the required column `number_of_people` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "number_of_people" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "capacity_of_group" INTEGER NOT NULL DEFAULT 4;
