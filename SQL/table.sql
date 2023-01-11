CREATE DATABASE IBANKING
GO

USE IBANKING
GO

CREATE TABLE DS_TK
(
	ID_TK varchar (20),
	Pass varchar (20),
	Ten_DK nvarchar (40),
	Ten_Goi_Nho nvarchar (40),
	Email varchar (20),
	Phone varchar (10)

	primary key (ID_TK)
)
GO

CREATE TABLE TK_TT
(
	ID_TK varchar (20),
	Ma_TK varchar (10),
	So_Du money,
	Ngan_Hang varchar (20),
	Loai_TK nvarchar (20) check (Loai_TK = N'TK thường' or Loai_TK = N'TK thanh toán')

	primary key (ID_TK, Ma_TK)
)
GO

CREATE TABLE DS_CK
(
	Ma_Ng_Gui varchar (10),
	Ma_Ng_Nhan varchar (10),
	So_Tien money,
	Noi_Dung_Chuyen nvarchar (50),
	Hinh_Thuc_TT nvarchar (30) check (Hinh_Thuc_TT = N'Người gửi trả phí' or Hinh_Thuc_TT = N'Người nhận trả phí'),
	Ngay_Gio datetime

	primary key (Ngay_Gio)
)
GO

CREATE TABLE DS_NN
(
	Ma_Ng_Gui varchar (10),
	Ma_Ng_Nhan varchar (10),
	So_No money,
	Noi_Dung nvarchar (50),
	Trang_Thai nvarchar (20) check (Trang_Thai = N'Đã thanh toán' or Trang_Thai = N'Chưa thanh toán'),
	Ngay_Gio datetime

	primary key (Ngay_Gio)
)
GO

CREATE TABLE DS_GN ( 
	Id1 varchar(255), 
	Id2 varchar(255), 
	Ten_Goi_Nho varchar(255) 
	
	primary key(Id1, Id2)
) 
go


ALTER TABLE dbo.TK_TT ADD FOREIGN KEY (ID_TK) REFERENCES dbo.DS_TK (ID_TK)	

ALTER TABLE dbo.DS_CK ADD FOREIGN KEY (Ma_Ng_Gui) REFERENCES dbo.TK_TT (Ma_TK)
ALTER TABLE dbo.DS_CK ADD FOREIGN KEY (Ma_Ng_Nhan) REFERENCES dbo.TK_TT (Ma_TK)

ALTER TABLE dbo.DS_NN ADD FOREIGN KEY (Ma_Ng_Gui) REFERENCES dbo.TK_TT (Ma_TK)
ALTER TABLE dbo.DS_NN ADD FOREIGN KEY (Ma_Ng_Nhan) REFERENCES dbo.TK_TT (Ma_TK)