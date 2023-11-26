/*
  Warnings:

  - You are about to drop the column `userId` on the `Spaces` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Spaces" DROP CONSTRAINT "Spaces_userId_fkey";

-- AlterTable
ALTER TABLE "Spaces" DROP COLUMN "userId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
