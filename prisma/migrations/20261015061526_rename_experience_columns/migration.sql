/*
  Warnings:

  - You are about to drop the `WorkAchievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkExperience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkAchievement" DROP CONSTRAINT "WorkAchievement_workExperienceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_profileId_fkey";

-- DropTable
DROP TABLE "WorkAchievement";

-- DropTable
DROP TABLE "WorkExperience";

-- CreateTable
CREATE TABLE "Experience" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "companyName" TEXT NOT NULL,
    "positionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceAchievement" (
    "id" UUID NOT NULL,
    "experienceId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienceAchievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceAchievement" ADD CONSTRAINT "ExperienceAchievement_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
