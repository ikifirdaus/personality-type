/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Article`;

-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDescription` VARCHAR(191) NULL,
    `metaKeywords` VARCHAR(191) NULL,
    `canonicalUrl` VARCHAR(191) NULL,
    `ogImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `article_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
