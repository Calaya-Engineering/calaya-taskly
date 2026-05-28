-- AlterTable
ALTER TABLE `Document` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `isPrivate` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `EventAcknowledgement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `acknowledgedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EventAcknowledgement_taskId_idx`(`taskId`),
    INDEX `EventAcknowledgement_userId_idx`(`userId`),
    UNIQUE INDEX `EventAcknowledgement_taskId_userId_key`(`taskId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TenderComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenderId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TenderComment_tenderId_idx`(`tenderId`),
    INDEX `TenderComment_userId_idx`(`userId`),
    INDEX `TenderComment_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `userEmail` VARCHAR(191) NULL,
    `userRole` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `targetType` VARCHAR(191) NULL,
    `targetId` INTEGER NULL,
    `summary` TEXT NULL,
    `metadata` TEXT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_userId_idx`(`userId`),
    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_targetType_targetId_idx`(`targetType`, `targetId`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mention` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentionedUserId` INTEGER NOT NULL,
    `actorUserId` INTEGER NULL,
    `sourceType` VARCHAR(191) NOT NULL,
    `sourceId` INTEGER NOT NULL,
    `context` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Mention_mentionedUserId_idx`(`mentionedUserId`),
    INDEX `Mention_sourceType_sourceId_idx`(`sourceType`, `sourceId`),
    INDEX `Mention_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Document_isPrivate_idx` ON `Document`(`isPrivate`);

-- AddForeignKey
ALTER TABLE `EventAcknowledgement` ADD CONSTRAINT `EventAcknowledgement_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAcknowledgement` ADD CONSTRAINT `EventAcknowledgement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TenderComment` ADD CONSTRAINT `TenderComment_tenderId_fkey` FOREIGN KEY (`tenderId`) REFERENCES `Tender`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TenderComment` ADD CONSTRAINT `TenderComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mention` ADD CONSTRAINT `Mention_mentionedUserId_fkey` FOREIGN KEY (`mentionedUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mention` ADD CONSTRAINT `Mention_actorUserId_fkey` FOREIGN KEY (`actorUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
