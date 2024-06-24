/*
  Warnings:

  - You are about to drop the column `store_id` on the `booking` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "store_id",
ADD COLUMN     "client_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_picture" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255) NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "time_range" VARCHAR(10) NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_capacity" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "time_11_12" INTEGER NOT NULL DEFAULT 2,
    "time_12_13" INTEGER NOT NULL DEFAULT 2,
    "time_13_14" INTEGER NOT NULL DEFAULT 2,
    "time_14_15" INTEGER NOT NULL DEFAULT 2,
    "time_15_16" INTEGER NOT NULL DEFAULT 0,
    "time_16_17" INTEGER NOT NULL DEFAULT 0,
    "time_17_18" INTEGER NOT NULL DEFAULT 2,
    "time_18_19" INTEGER NOT NULL DEFAULT 2,
    "time_19_20" INTEGER NOT NULL DEFAULT 2,
    "time_20_21" INTEGER NOT NULL DEFAULT 2,
    "time_21_22" INTEGER NOT NULL DEFAULT 0,
    "time_22_23" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_capacity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_email_key" ON "restaurant"("email");
