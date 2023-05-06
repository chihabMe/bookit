-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('pending', 'processing', 'delivered', 'canceled') NOT NULL DEFAULT 'pending';
