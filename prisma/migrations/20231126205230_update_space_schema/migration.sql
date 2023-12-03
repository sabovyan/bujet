/*
  Warnings:

  - You are about to drop the `_SpaceToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[creatorId,name]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SpaceToUser" DROP CONSTRAINT "_SpaceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpaceToUser" DROP CONSTRAINT "_SpaceToUser_B_fkey";

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_SpaceToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Space_creatorId_name_key" ON "Space"("creatorId", "name");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
