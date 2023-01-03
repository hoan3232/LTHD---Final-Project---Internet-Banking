/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `DS_CK` (
    `Ngay_Gio` DATETIME(3) NOT NULL,
    `Ma_Ng_Gui` CHAR(255) NOT NULL,
    `Ma_Ng_Nhan` CHAR(255) NOT NULL,
    `So_Tien` DOUBLE NULL DEFAULT 0,
    `Noi_Dung` TEXT NULL,
    `Hinh_Thuc_TT` BOOLEAN NULL,

    INDEX `Ma_Ng_Gui`(`Ma_Ng_Gui`),
    INDEX `Ma_Ng_Nhan`(`Ma_Ng_Nhan`),
    PRIMARY KEY (`Ngay_Gio`, `Ma_Ng_Gui`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DS_NN` (
    `Ngay_Gio` DATETIME(3) NOT NULL,
    `Ma_Ng_Gui` CHAR(255) NOT NULL,
    `Ma_Ng_Nhan` CHAR(255) NOT NULL,
    `So_No` DOUBLE NULL,
    `Noi_Dung` TEXT NULL,
    `Trang_Thai` BOOLEAN NULL,

    INDEX `Ma_Ng_Gui`(`Ma_Ng_Gui`),
    INDEX `Ma_Ng_Nhan`(`Ma_Ng_Nhan`),
    PRIMARY KEY (`Ngay_Gio`, `Ma_Ng_Gui`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DS_TK` (
    `Id` CHAR(255) NOT NULL,
    `Pass` TEXT NOT NULL,
    `Ten_DK` TEXT NOT NULL,
    `Ten_Goi_Nho` TEXT NULL,
    `Email` CHAR(255) NOT NULL,
    `Phone` CHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TK_TT` (
    `Id` CHAR(255) NULL,
    `STK` CHAR(255) NOT NULL,
    `So_Du` DOUBLE NULL DEFAULT 50,
    `Ngan_Hang` CHAR(255) NULL,

    UNIQUE INDEX `Id`(`Id`),
    PRIMARY KEY (`STK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DS_CK` ADD CONSTRAINT `DS_CK_ibfk_1` FOREIGN KEY (`Ma_Ng_Gui`) REFERENCES `TK_TT`(`STK`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DS_CK` ADD CONSTRAINT `DS_CK_ibfk_2` FOREIGN KEY (`Ma_Ng_Nhan`) REFERENCES `TK_TT`(`STK`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DS_NN` ADD CONSTRAINT `DS_NN_ibfk_1` FOREIGN KEY (`Ma_Ng_Nhan`) REFERENCES `TK_TT`(`STK`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DS_NN` ADD CONSTRAINT `DS_NN_ibfk_2` FOREIGN KEY (`Ma_Ng_Gui`) REFERENCES `TK_TT`(`STK`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TK_TT` ADD CONSTRAINT `TK_TT_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `DS_TK`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
