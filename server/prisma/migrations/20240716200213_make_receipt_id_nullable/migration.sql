/*
  Warnings:

  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "receiptId" TEXT,
    "description" TEXT NOT NULL,
    "mcc" INTEGER NOT NULL,
    "originalMcc" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "operationAmount" INTEGER NOT NULL,
    "currencyCode" INTEGER NOT NULL,
    "commissionRate" INTEGER NOT NULL,
    "cashbackAmount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "hold" BOOLEAN NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
