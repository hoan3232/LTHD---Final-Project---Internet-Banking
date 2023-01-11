-- CreateTable
CREATE TABLE `DS_GN` (
    `Id1` CHAR(255) NOT NULL,
    `Id2` CHAR(255) NOT NULL,
    `TenGN` CHAR(255) NULL,

    PRIMARY KEY (`Id1`, `Id2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
