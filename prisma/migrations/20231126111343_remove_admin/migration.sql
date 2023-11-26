/*
  Warnings:

  - You are about to drop the column `adminId` on the `Spaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Spaces" DROP CONSTRAINT "Spaces_adminId_fkey";

-- AlterTable
ALTER TABLE "Spaces" DROP COLUMN "adminId";
