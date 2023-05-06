-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `status` ENUM('proccesing', 'canceled', 'completed') NOT NULL DEFAULT 'proccesing';
