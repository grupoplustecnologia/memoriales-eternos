/*
  Warnings:

  - You are about to drop the column `starsSpent` on the `tributes` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyRefreshDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyStars` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `mission_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `star_purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mission_progress" DROP CONSTRAINT "mission_progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "star_purchases" DROP CONSTRAINT "star_purchases_userId_fkey";

-- AlterTable
ALTER TABLE "animal_profiles" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tributes" DROP COLUMN "starsSpent";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "monthlyRefreshDate",
DROP COLUMN "monthlyStars",
DROP COLUMN "stars";

-- DropTable
DROP TABLE "mission_progress";

-- DropTable
DROP TABLE "star_purchases";

-- CreateTable
CREATE TABLE "profile_highlights" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_highlights_profileId_weekStartDate_key" ON "profile_highlights"("profileId", "weekStartDate");

-- AddForeignKey
ALTER TABLE "profile_highlights" ADD CONSTRAINT "profile_highlights_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "animal_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
