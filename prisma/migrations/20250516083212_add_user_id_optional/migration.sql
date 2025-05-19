-- AlterTable
ALTER TABLE `article` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
