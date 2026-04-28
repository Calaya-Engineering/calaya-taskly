-- Hot-path notification indexes for inbox queries and queue processing.
CREATE INDEX `Notification_recipientId_read_createdAt_idx`
  ON `Notification`(`recipientId`, `read`, `createdAt`);

CREATE INDEX `Notification_actionType_targetId_recipientId_idx`
  ON `Notification`(`actionType`, `targetId`, `recipientId`);

CREATE INDEX `Notification_emailStatus_emailAttempts_createdAt_idx`
  ON `Notification`(`emailStatus`, `emailAttempts`, `createdAt`);
