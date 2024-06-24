/*
  Warnings:

  - A unique constraint covering the columns `[client_id,day,booking_type]` on the table `booking_capacity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "booking_capacity_client_id_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "booking_capacity_client_id_day_booking_type_key" ON "booking_capacity"("client_id", "day", "booking_type");
