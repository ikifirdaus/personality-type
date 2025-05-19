-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `duration` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
