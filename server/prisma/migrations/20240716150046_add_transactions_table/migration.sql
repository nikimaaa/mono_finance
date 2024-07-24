-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "receiptId" TEXT NOT NULL,
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

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
