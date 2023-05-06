/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - Made the column `restaurantId` on table `MenuItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `restaurantId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `restaurantId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `date`,
    ADD COLUMN `checkIn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Table` ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
