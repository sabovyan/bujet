/*
  Warnings:

  - You are about to drop the `UserGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToUserGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToUserGroup" DROP CONSTRAINT "_UserToUserGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserGroup" DROP CONSTRAINT "_UserToUserGroup_B_fkey";

-- DropTable
DROP TABLE "UserGroup";

-- DropTable
DROP TABLE "_UserToUserGroup";

-- CreateTable
CREATE TABLE "Spaces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpacesToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpacesToUser_AB_unique" ON "_SpacesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpacesToUser_B_index" ON "_SpacesToUser"("B");

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpacesToUser" ADD CONSTRAINT "_SpacesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpacesToUser" ADD CONSTRAINT "_SpacesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
