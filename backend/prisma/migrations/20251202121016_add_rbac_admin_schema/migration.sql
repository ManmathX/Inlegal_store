/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_userId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bannedAt` DATETIME(3) NULL,
    ADD COLUMN `bannedBy` INTEGER NULL,
    ADD COLUMN `bannedReason` TEXT NULL,
    ADD COLUMN `bio` TEXT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NULL,
    ADD COLUMN `reputation` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `role` ENUM('USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `department` VARCHAR(191) NULL,
    `permissions` TEXT NOT NULL,
    `canBanUsers` BOOLEAN NOT NULL DEFAULT false,
    `canDeletePosts` BOOLEAN NOT NULL DEFAULT false,
    `canApprovePosts` BOOLEAN NOT NULL DEFAULT true,
    `canManageUsers` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_userId_key`(`userId`),
    INDEX `Admin_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'FLAGGED') NOT NULL DEFAULT 'PENDING',
    `isLegal` BOOLEAN NOT NULL DEFAULT true,
    `upvotes` INTEGER NOT NULL DEFAULT 0,
    `downvotes` INTEGER NOT NULL DEFAULT 0,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `featuredAt` DATETIME(3) NULL,
    `approvedAt` DATETIME(3) NULL,
    `approvedBy` INTEGER NULL,
    `rejectedAt` DATETIME(3) NULL,
    `rejectedBy` INTEGER NULL,
    `rejectionReason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Post_userId_idx`(`userId`),
    INDEX `Post_status_idx`(`status`),
    INDEX `Post_category_idx`(`category`),
    INDEX `Post_isFeatured_idx`(`isFeatured`),
    INDEX `Post_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `postId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Comment_postId_idx`(`postId`),
    INDEX `Comment_userId_idx`(`userId`),
    INDEX `Comment_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isUpvote` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `postId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Vote_postId_idx`(`postId`),
    INDEX `Vote_userId_idx`(`userId`),
    UNIQUE INDEX `Vote_postId_userId_key`(`postId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'FLAG', 'BAN', 'UNBAN') NOT NULL,
    `targetType` VARCHAR(191) NOT NULL,
    `targetId` INTEGER NOT NULL,
    `details` TEXT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adminId` INTEGER NOT NULL,

    INDEX `AuditLog_adminId_idx`(`adminId`),
    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_targetType_idx`(`targetType`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Product_category_idx` ON `Product`(`category`);

-- CreateIndex
CREATE INDEX `Product_isActive_idx` ON `Product`(`isActive`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_role_idx` ON `User`(`role`);

-- CreateIndex
CREATE INDEX `User_isActive_idx` ON `User`(`isActive`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_bannedBy_fkey` FOREIGN KEY (`bannedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
