/*
  Warnings:

  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('SINGLE', 'GROUP');

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "type" "BookingType" NOT NULL DEFAULT 'SINGLE';

-- AlterTable
ALTER TABLE "booking_capacity" ADD COLUMN     "booking_type" "BookingType" NOT NULL DEFAULT 'SINGLE';

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "support_group" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "support_single" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "store";
