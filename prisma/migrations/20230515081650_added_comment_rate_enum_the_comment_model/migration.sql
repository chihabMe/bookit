-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `rate` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE') NOT NULL DEFAULT 'ONE';