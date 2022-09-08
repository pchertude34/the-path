-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` VARCHAR(1042) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `location` point NOT NULL,
    `undisclosed` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(256) NOT NULL,
    `city` VARCHAR(256) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `website` VARCHAR(126) NULL,
    `email` VARCHAR(256) NULL,
    `description` VARCHAR(256) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(8) NOT NULL,
    `description` VARCHAR(256) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceOnProvider` (
    `provider_id` INTEGER NOT NULL,
    `service_id` VARCHAR(8) NOT NULL,

    INDEX `service`(`service_id`),
    PRIMARY KEY (`provider_id`, `service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceOnProvider` ADD CONSTRAINT `provider` FOREIGN KEY (`provider_id`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ServiceOnProvider` ADD CONSTRAINT `service` FOREIGN KEY (`service_id`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
