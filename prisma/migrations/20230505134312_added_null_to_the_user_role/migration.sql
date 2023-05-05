-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'customer', 'restaurant', 'null') NULL DEFAULT 'null';
