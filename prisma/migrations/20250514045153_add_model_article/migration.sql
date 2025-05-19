-- CreateTable
CREATE TABLE `Article` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDescription` VARCHAR(191) NULL,
    `metaKeywords` VARCHAR(191) NULL,
    `canonicalUrl` VARCHAR(191) NULL,
    `ogImage` VARCHAR(191) NULL,
    `readingTime` INTEGER NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Article_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
