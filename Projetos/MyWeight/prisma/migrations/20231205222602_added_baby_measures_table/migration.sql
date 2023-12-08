/*
  Warnings:

  - You are about to drop the `measures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "measures";

-- CreateTable
CREATE TABLE "adult" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "adult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baby" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "baby_pkey" PRIMARY KEY ("id")
);
