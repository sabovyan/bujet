/*
  Warnings:

  - Added the required column `favorite` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "favorite" BOOLEAN NOT NULL;
