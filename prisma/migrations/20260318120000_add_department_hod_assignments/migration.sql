CREATE TABLE `DepartmentHod` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `departmentId` INTEGER NOT NULL,
  `hodId` INTEGER NOT NULL,
  `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  UNIQUE INDEX `DepartmentHod_departmentId_hodId_key`(`departmentId`, `hodId`),
  INDEX `DepartmentHod_hodId_idx`(`hodId`),
  INDEX `DepartmentHod_departmentId_idx`(`departmentId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `DepartmentHod`
  ADD CONSTRAINT `DepartmentHod_departmentId_fkey`
  FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `DepartmentHod`
  ADD CONSTRAINT `DepartmentHod_hodId_fkey`
  FOREIGN KEY (`hodId`) REFERENCES `User`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `DepartmentHod` (`departmentId`, `hodId`, `assignedAt`)
SELECT d.`id`, u.`id`, NOW(3)
FROM `User` u
INNER JOIN `Department` d ON d.`name` = u.`department`
WHERE u.`role` = 'HOD'
  AND u.`department` IS NOT NULL
  AND TRIM(u.`department`) <> ''
ON DUPLICATE KEY UPDATE `departmentId` = `departmentId`;
