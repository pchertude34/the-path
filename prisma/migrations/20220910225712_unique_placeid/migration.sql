/*
  Warnings:

  - You are about to alter the column `place_id` on the `Provider` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1042)` to `VarChar(256)`.
  - A unique constraint covering the columns `[place_id]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Provider` MODIFY `place_id` VARCHAR(256) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Provider_place_id_key` ON `Provider`(`place_id`);
