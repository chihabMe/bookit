-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('admin', 'customer') NOT NULL DEFAULT 'customer';
