/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `MenuItem` ALTER COLUMN `slug` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_slug_key` ON `MenuItem`(`slug`);
