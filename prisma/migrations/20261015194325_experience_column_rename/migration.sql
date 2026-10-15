/*
  Warnings:

  - You are about to drop the column `companyName` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `positionName` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `company` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" RENAME COLUMN "companyName" TO "company";
ALTER TABLE "Experience" RENAME COLUMN "positionName" TO "position";
