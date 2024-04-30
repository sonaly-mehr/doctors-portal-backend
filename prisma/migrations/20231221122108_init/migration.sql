/*
  Warnings:

  - You are about to drop the column `apoointment_id` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apointment_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apointment_id` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_apoointment_id_fkey";

-- DropIndex
DROP INDEX "payment_apoointment_id_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "apoointment_id",
ADD COLUMN     "apointment_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_apointment_id_key" ON "payment"("apointment_id");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_apointment_id_fkey" FOREIGN KEY ("apointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
