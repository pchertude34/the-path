/*
  Warnings:

  - You are about to alter the column `lat` on the `Provider` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `long` on the `Provider` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Provider` MODIFY `lat` DECIMAL(65, 30) NULL,
    MODIFY `long` DECIMAL(65, 30) NULL;
