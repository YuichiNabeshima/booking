/*
  Warnings:

  - You are about to drop the `restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurant_course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurant_picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "restaurant";

-- DropTable
DROP TABLE "restaurant_course";

-- DropTable
DROP TABLE "restaurant_picture";

-- CreateTable
CREATE TABLE "client_picture" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255) NOT NULL,
    "client_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "time_range" VARCHAR(10) NOT NULL,
    "client_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
