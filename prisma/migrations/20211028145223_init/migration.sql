-- CreateTable
CREATE TABLE `Providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `undisclosed` BOOLEAN NOT NULL DEFAULT false,
    `spanish` BOOLEAN NOT NULL DEFAULT false,
    `street` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip` INTEGER NULL,
    `lat` INTEGER NULL,
    `long` INTEGER NULL,
    `website` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
