/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkAchievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkExperience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profileId` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profileId` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profileId` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `WorkAchievement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workExperienceId` on the `WorkAchievement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `WorkExperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profileId` on the `WorkExperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_profileId_fkey";

-- DropForeignKey
ALTER TABLE "WorkAchievement" DROP CONSTRAINT "WorkAchievement_workExperienceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" UUID NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" UUID NOT NULL,
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" UUID NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkAchievement" DROP CONSTRAINT "WorkAchievement_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "workExperienceId",
ADD COLUMN     "workExperienceId" UUID NOT NULL,
ADD CONSTRAINT "WorkAchievement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" UUID NOT NULL,
ADD CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkAchievement" ADD CONSTRAINT "WorkAchievement_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "WorkExperience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
