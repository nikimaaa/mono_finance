-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('STRING', 'NUMBER', 'OBJECT');

-- CreateTable
CREATE TABLE "Reserve" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "link" TEXT,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "SettingType" NOT NULL DEFAULT 'STRING',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);
