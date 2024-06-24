/*
  Warnings:

  - A unique constraint covering the columns `[client_id,day]` on the table `booking_capacity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booking_capacity_client_id_day_key" ON "booking_capacity"("client_id", "day");
