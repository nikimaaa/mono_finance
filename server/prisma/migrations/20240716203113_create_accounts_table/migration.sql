-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "sendId" TEXT,
    "currencyCode" INTEGER,
    "cashbackType" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "creditLimit" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "maskedPan" TEXT[],
    "type" TEXT NOT NULL,
    "iban" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
