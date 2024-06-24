/*
  Warnings:

  - You are about to drop the `mail_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mail_que` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "mail_log";

-- DropTable
DROP TABLE "mail_que";

-- CreateTable
CREATE TABLE "mailQue" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mailQue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mailLog" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mailLog_pkey" PRIMARY KEY ("id")
);
