USE [master]
GO
/****** Object:  Database [KeyMoney]    Script Date: 27/10/2021 10:25:16 ******/
CREATE DATABASE [KeyMoney]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KeyMoney', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KeyMoney.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KeyMoney_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KeyMoney_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [KeyMoney] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KeyMoney].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KeyMoney] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KeyMoney] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KeyMoney] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KeyMoney] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KeyMoney] SET ARITHABORT OFF 
GO
ALTER DATABASE [KeyMoney] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KeyMoney] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KeyMoney] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KeyMoney] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KeyMoney] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KeyMoney] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KeyMoney] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KeyMoney] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KeyMoney] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KeyMoney] SET  DISABLE_BROKER 
GO
ALTER DATABASE [KeyMoney] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KeyMoney] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KeyMoney] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KeyMoney] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KeyMoney] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KeyMoney] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KeyMoney] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KeyMoney] SET RECOVERY FULL 
GO
ALTER DATABASE [KeyMoney] SET  MULTI_USER 
GO
ALTER DATABASE [KeyMoney] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KeyMoney] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KeyMoney] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KeyMoney] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KeyMoney] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KeyMoney] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [KeyMoney] SET QUERY_STORE = OFF
GO
USE [KeyMoney]
GO
/****** Object:  Table [dbo].[Amuta]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Amuta](
	[id_amuta] [int] IDENTITY(1,1) NOT NULL,
	[name_amuta] [nvarchar](20) NOT NULL,
	[ribit] [float] NOT NULL,
 CONSTRAINT [PK_Amuta] PRIMARY KEY CLUSTERED 
(
	[id_amuta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Amuta_deposits]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Amuta_deposits](
	[id_deposit] [int] IDENTITY(1,1) NOT NULL,
	[id_amuta] [int] NOT NULL,
	[id_user] [nvarchar](9) NOT NULL,
	[sum] [int] NOT NULL,
	[dateOfDeposit] [date] NOT NULL,
 CONSTRAINT [PK_Amuta_deposit] PRIMARY KEY CLUSTERED 
(
	[id_deposit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Expenses]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Expenses](
	[id_expense] [int] IDENTITY(1,1) NOT NULL,
	[name_expense] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Expenses] PRIMARY KEY CLUSTERED 
(
	[id_expense] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Income]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Income](
	[id_income] [int] IDENTITY(1,1) NOT NULL,
	[name_income] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Income] PRIMARY KEY CLUSTERED 
(
	[id_income] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Kinds]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kinds](
	[id_kind] [int] IDENTITY(1,1) NOT NULL,
	[name_kind] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_Kinds] PRIMARY KEY CLUSTERED 
(
	[id_kind] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loans]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loans](
	[id_loan] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [nvarchar](9) NOT NULL,
	[date_ofLoan] [date] NOT NULL,
	[sum] [int] NOT NULL,
	[prisa] [int] NOT NULL,
	[ribit] [float] NOT NULL,
	[id_expense] [int] NOT NULL,
	[days_toGetMailAlert] [int] NOT NULL,
	[loan_info] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Loans] PRIMARY KEY CLUSTERED 
(
	[id_loan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id_user] [nvarchar](9) NOT NULL,
	[name_user] [nvarchar](20) NOT NULL,
	[tel] [nvarchar](10) NOT NULL,
	[misgeret] [int] NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[id_amuta] [int] NULL,
	[is_admin] [bit] NOT NULL,
	[is_disabled] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_expense]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_expense](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_expense] [int] NOT NULL,
	[id_kind] [int] NOT NULL,
	[id_user] [nvarchar](9) NOT NULL,
	[sum] [int] NOT NULL,
	[expense_date] [date] NOT NULL,
	[expense_info] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_User_expense] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_income]    Script Date: 27/10/2021 10:25:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_income](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_income] [int] NOT NULL,
	[id_kind] [int] NOT NULL,
	[id_user] [nvarchar](9) NOT NULL,
	[sum] [int] NOT NULL,
	[income_date] [date] NOT NULL,
	[income_info] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_User_income] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Amuta] ON 
GO
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (1, N'גמח נישואי ילדים', 0.01)
GO
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (2, N'הגמח המרכזי', 0.03)
GO
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (3, N'אושר בכבוד', 0.04)
GO
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (4, N'קופת השכונה', 0)
GO
SET IDENTITY_INSERT [dbo].[Amuta] OFF
GO
SET IDENTITY_INSERT [dbo].[Amuta_deposits] ON 
GO
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (3, 3, N'312519697', 210, CAST(N'2021-10-26' AS Date))
GO
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (4, 1, N'312519697', 5000, CAST(N'2021-10-27' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Amuta_deposits] OFF
GO
SET IDENTITY_INSERT [dbo].[Expenses] ON 
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (1, N'כלכלת בית')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (2, N'רפואה')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (3, N'ביטוחים')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (4, N'לימודים')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (5, N'פנאי')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (6, N'מתנות')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (7, N'ביגוד')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (8, N'טלפון')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (9, N'מים')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (10, N'חשמל')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (11, N'גז')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (12, N'תרומות')
GO
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (13, N'אחר')
GO
SET IDENTITY_INSERT [dbo].[Expenses] OFF
GO
SET IDENTITY_INSERT [dbo].[Income] ON 
GO
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (1, N'משכורת')
GO
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (2, N'מענק')
GO
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (3, N'הכנסה לא רשמית')
GO
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (4, N'ביטוח לאומי')
GO
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (5, N'מתנות')
GO
SET IDENTITY_INSERT [dbo].[Income] OFF
GO
SET IDENTITY_INSERT [dbo].[Kinds] ON 
GO
INSERT [dbo].[Kinds] ([id_kind], [name_kind]) VALUES (1, N'קבועות')
GO
INSERT [dbo].[Kinds] ([id_kind], [name_kind]) VALUES (2, N'משתנות')
GO
SET IDENTITY_INSERT [dbo].[Kinds] OFF
GO
SET IDENTITY_INSERT [dbo].[Loans] ON 
GO
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [id_expense], [days_toGetMailAlert], [loan_info]) VALUES (1, N'312519697', CAST(N'2021-10-26' AS Date), 15000, 12, 0.5, 10, 0, N'BANK')
GO
SET IDENTITY_INSERT [dbo].[Loans] OFF
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'312121212', N'ayala', N'0583211062', 12000, N'ayalay062@gmail.com', NULL, 0, 0)
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'312519697', N'Ayala', N'0583211062', 12000, N'ayalay062@gmail.com', 1, 0, 0)
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'admin9958', N'Ayala', N'232332323', 23233, N'ayalay062@gmail.com', NULL, 0, 0)
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'be666ppp', N'beni peach', N'078788787', 8000, N'peach@gmail.com', NULL, 0, 0)
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'ch333mmm', N'chana melon', N'078788766', 20000, N'melon@gmail.com', NULL, 0, 0)
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email], [id_amuta], [is_admin], [is_disabled]) VALUES (N'da222ggg', N'david grape', N'078788785', 15000, N'grape@gmail.com', NULL, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[User_expense] ON 
GO
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date], [expense_info]) VALUES (3, 2, 1, N'312519697', 120, CAST(N'2021-10-24' AS Date), N'קניתי בtFOX')
GO
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date], [expense_info]) VALUES (6, 12, 2, N'312519697', 150, CAST(N'2021-10-27' AS Date), N'קופת העיר')
GO
SET IDENTITY_INSERT [dbo].[User_expense] OFF
GO
SET IDENTITY_INSERT [dbo].[User_income] ON 
GO
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date], [income_info]) VALUES (1, 1, 1, N'312519697', 10000, CAST(N'2021-10-26' AS Date), N'12000')
GO
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date], [income_info]) VALUES (2, 2, 1, N'312519697', 10000, CAST(N'2021-10-26' AS Date), N'12000')
GO
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date], [income_info]) VALUES (3, 2, 1, N'312519697', 1222, CAST(N'2021-10-24' AS Date), N'ttt')
GO
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date], [income_info]) VALUES (4, 1, 1, N'312519697', 12222, CAST(N'2021-10-27' AS Date), N'ttt')
GO
SET IDENTITY_INSERT [dbo].[User_income] OFF
GO
ALTER TABLE [dbo].[User] ADD  DEFAULT ((0)) FOR [is_admin]
GO
ALTER TABLE [dbo].[User] ADD  DEFAULT ((0)) FOR [is_disabled]
GO
ALTER TABLE [dbo].[Amuta_deposits]  WITH CHECK ADD FOREIGN KEY([id_amuta])
REFERENCES [dbo].[Amuta] ([id_amuta])
GO
ALTER TABLE [dbo].[Amuta_deposits]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
GO
ALTER TABLE [dbo].[Loans]  WITH CHECK ADD FOREIGN KEY([id_expense])
REFERENCES [dbo].[Expenses] ([id_expense])
GO
ALTER TABLE [dbo].[Loans]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD FOREIGN KEY([id_amuta])
REFERENCES [dbo].[Amuta] ([id_amuta])
GO
ALTER TABLE [dbo].[User_expense]  WITH CHECK ADD FOREIGN KEY([id_expense])
REFERENCES [dbo].[Expenses] ([id_expense])
GO
ALTER TABLE [dbo].[User_expense]  WITH CHECK ADD FOREIGN KEY([id_kind])
REFERENCES [dbo].[Kinds] ([id_kind])
GO
ALTER TABLE [dbo].[User_expense]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
GO
ALTER TABLE [dbo].[User_income]  WITH CHECK ADD FOREIGN KEY([id_income])
REFERENCES [dbo].[Income] ([id_income])
GO
ALTER TABLE [dbo].[User_income]  WITH CHECK ADD FOREIGN KEY([id_kind])
REFERENCES [dbo].[Kinds] ([id_kind])
GO
ALTER TABLE [dbo].[User_income]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
GO
USE [master]
GO
ALTER DATABASE [KeyMoney] SET  READ_WRITE 
GO
