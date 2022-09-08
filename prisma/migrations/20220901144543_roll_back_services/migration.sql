/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Provider` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `description` VARCHAR(128) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Service_description_key` ON `Service`(`description`);
