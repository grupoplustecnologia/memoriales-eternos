/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `animal_profiles` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `animal_profiles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "animal_profiles" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "privacy_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "profilePublic" BOOLEAN NOT NULL DEFAULT true,
    "memorialsVisible" BOOLEAN NOT NULL DEFAULT true,
    "anonymousTributes" BOOLEAN NOT NULL DEFAULT false,
    "publicStats" BOOLEAN NOT NULL DEFAULT true,
    "searchEngineIndexing" BOOLEAN NOT NULL DEFAULT false,
    "blockedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privacy_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tribute_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tributeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tribute_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tribute_reports" (
    "id" TEXT NOT NULL,
    "tributeId" TEXT NOT NULL,
    "reportedByUserId" TEXT,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tribute_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tribute_replies" (
    "id" TEXT NOT NULL,
    "tributeId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tribute_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "privacy_settings_userId_key" ON "privacy_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tribute_likes_userId_tributeId_key" ON "tribute_likes"("userId", "tributeId");

-- CreateIndex
CREATE UNIQUE INDEX "animal_profiles_slug_key" ON "animal_profiles"("slug");

-- AddForeignKey
ALTER TABLE "privacy_settings" ADD CONSTRAINT "privacy_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_likes" ADD CONSTRAINT "tribute_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_likes" ADD CONSTRAINT "tribute_likes_tributeId_fkey" FOREIGN KEY ("tributeId") REFERENCES "tributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_reports" ADD CONSTRAINT "tribute_reports_tributeId_fkey" FOREIGN KEY ("tributeId") REFERENCES "tributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_reports" ADD CONSTRAINT "tribute_reports_reportedByUserId_fkey" FOREIGN KEY ("reportedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_replies" ADD CONSTRAINT "tribute_replies_tributeId_fkey" FOREIGN KEY ("tributeId") REFERENCES "tributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tribute_replies" ADD CONSTRAINT "tribute_replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
