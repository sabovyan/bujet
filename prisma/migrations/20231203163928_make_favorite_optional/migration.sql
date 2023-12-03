/*
  Warnings:

  - A unique constraint covering the columns `[creatorId,name,spaceId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "List" ALTER COLUMN "favorite" DROP NOT NULL,
ALTER COLUMN "favorite" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "List_creatorId_name_spaceId_key" ON "List"("creatorId", "name", "spaceId");
