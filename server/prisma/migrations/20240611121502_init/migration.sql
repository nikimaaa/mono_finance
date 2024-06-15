-- CreateTable
CREATE TABLE "Reserve" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER,
    "link" TEXT,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);
