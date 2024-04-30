/*
  Warnings:

  - You are about to drop the column `email` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `patient_name` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "email",
DROP COLUMN "patient_name",
DROP COLUMN "phone_number";
