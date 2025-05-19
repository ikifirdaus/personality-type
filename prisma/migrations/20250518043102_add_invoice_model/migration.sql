-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `invoice_transactionId_key`(`transactionId`),
    UNIQUE INDEX `invoice_invoiceNumber_key`(`invoiceNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
