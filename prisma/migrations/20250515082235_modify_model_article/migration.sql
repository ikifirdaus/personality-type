/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `readingTime` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `isPublished`,
    DROP COLUMN `publishedAt`,
    DROP COLUMN `readingTime`;
