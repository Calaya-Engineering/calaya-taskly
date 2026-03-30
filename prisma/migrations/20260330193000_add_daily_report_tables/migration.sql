-- CreateTable
CREATE TABLE `DailyReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `submittedBy` VARCHAR(191) NOT NULL,
    `submittedByRole` VARCHAR(191) NULL,
    `submittedByUserId` INTEGER NULL,
    `reportDate` DATETIME(3) NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `summary` VARCHAR(191) NULL,
    `payloadSource` TEXT NULL,
    `attachmentUrl` TEXT NULL,
    `attachmentName` VARCHAR(191) NULL,
    `downloads` INTEGER NOT NULL DEFAULT 0,
    `legacyDocumentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DailyReport_legacyDocumentId_key`(`legacyDocumentId`),
    INDEX `DailyReport_department_idx`(`department`),
    INDEX `DailyReport_status_idx`(`status`),
    INDEX `DailyReport_reportDate_idx`(`reportDate`),
    INDEX `DailyReport_submittedAt_idx`(`submittedAt`),
    INDEX `DailyReport_submittedByUserId_idx`(`submittedByUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyReportEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dailyReportId` INTEGER NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `taskName` VARCHAR(191) NOT NULL,
    `objective` TEXT NULL,
    `target` TEXT NULL,
    `nextDayTask` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DailyReportEntry_dailyReportId_idx`(`dailyReportId`),
    INDEX `DailyReportEntry_dailyReportId_orderIndex_idx`(`dailyReportId`, `orderIndex`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DailyReport` ADD CONSTRAINT `DailyReport_submittedByUserId_fkey`
FOREIGN KEY (`submittedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyReportEntry` ADD CONSTRAINT `DailyReportEntry_dailyReportId_fkey`
FOREIGN KEY (`dailyReportId`) REFERENCES `DailyReport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill legacy daily reports from Document rows.
INSERT INTO `DailyReport` (
    `title`,
    `department`,
    `submittedBy`,
    `submittedByRole`,
    `submittedByUserId`,
    `reportDate`,
    `submittedAt`,
    `status`,
    `summary`,
    `payloadSource`,
    `attachmentUrl`,
    `attachmentName`,
    `downloads`,
    `legacyDocumentId`,
    `createdAt`,
    `updatedAt`
)
SELECT
    `title`,
    `department`,
    `uploadedBy`,
    NULL,
    NULL,
    `createdAt`,
    `createdAt`,
    CASE
        WHEN `scope` IN ('PENDING', 'APPROVED', 'REVIEW_URGENTLY', 'REJECTED') THEN `scope`
        ELSE 'APPROVED'
    END,
    `fileSize`,
    `fileUrl`,
    NULL,
    NULL,
    `downloads`,
    `id`,
    `createdAt`,
    `updatedAt`
FROM `Document`
WHERE `type` = 'Report';
