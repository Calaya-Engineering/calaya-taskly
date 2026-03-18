ALTER TABLE `Notification`
  ADD COLUMN `linkPath` TEXT NULL,
  ADD COLUMN `emailSubject` TEXT NULL,
  ADD COLUMN `emailStatus` VARCHAR(191) NOT NULL DEFAULT 'SKIPPED',
  ADD COLUMN `emailAttempts` INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN `emailLastError` TEXT NULL,
  ADD COLUMN `emailSentAt` DATETIME(3) NULL;

CREATE INDEX `Notification_emailStatus_idx` ON `Notification`(`emailStatus`);
