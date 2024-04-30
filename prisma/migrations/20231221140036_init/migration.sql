/*
  Warnings:

  - Added the required column `email` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_name` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "patient_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
