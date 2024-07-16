/*
  Warnings:

  - You are about to alter the column `price` on the `Reserve` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(2,2)`.

*/
-- AlterTable
ALTER TABLE "Reserve" ALTER COLUMN "price" SET DATA TYPE DECIMAL(2,2);
