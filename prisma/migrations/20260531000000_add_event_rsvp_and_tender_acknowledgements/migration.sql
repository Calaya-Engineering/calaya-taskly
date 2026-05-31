-- CreateTable
CREATE TABLE `EventResponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `response` VARCHAR(191) NOT NULL,
    `respondedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `EventResponse_taskId_idx`(`taskId`),
    INDEX `EventResponse_userId_idx`(`userId`),
    INDEX `EventResponse_response_idx`(`response`),
    UNIQUE INDEX `EventResponse_taskId_userId_key`(`taskId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TenderAcknowledgement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenderId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `acknowledgedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TenderAcknowledgement_tenderId_idx`(`tenderId`),
    INDEX `TenderAcknowledgement_userId_idx`(`userId`),
    UNIQUE INDEX `TenderAcknowledgement_tenderId_userId_key`(`tenderId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventResponse` ADD CONSTRAINT `EventResponse_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventResponse` ADD CONSTRAINT `EventResponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TenderAcknowledgement` ADD CONSTRAINT `TenderAcknowledgement_tenderId_fkey` FOREIGN KEY (`tenderId`) REFERENCES `Tender`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TenderAcknowledgement` ADD CONSTRAINT `TenderAcknowledgement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
