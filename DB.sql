USE [master]
GO
/****** Object:  Database [KeyMoney]    Script Date: 19/10/2021 16:48:37 ******/
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
/****** Object:  Table [dbo].[Amuta]    Script Date: 19/10/2021 16:48:37 ******/
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
/****** Object:  Table [dbo].[Amuta_deposits]    Script Date: 19/10/2021 16:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Amuta_deposits](
	[id_deposit] [int] IDENTITY(1,1) NOT NULL,
	[id_amuta] [int] NOT NULL,
	[id_user] [nvarchar](9) NOT NULL,
	[sum] [int] NOT NULL,
	[dateOfDeposit] [date] NULL,
 CONSTRAINT [PK_Amuta_deposit] PRIMARY KEY CLUSTERED 
(
	[id_deposit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Expenses]    Script Date: 19/10/2021 16:48:37 ******/
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
/****** Object:  Table [dbo].[Income]    Script Date: 19/10/2021 16:48:37 ******/
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
/****** Object:  Table [dbo].[Kinds]    Script Date: 19/10/2021 16:48:37 ******/
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
/****** Object:  Table [dbo].[Loans]    Script Date: 19/10/2021 16:48:37 ******/
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
	[days_toGetMailAlert] [int] NOT NULL,
 CONSTRAINT [PK_Loans] PRIMARY KEY CLUSTERED 
(
	[id_loan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 19/10/2021 16:48:37 ******/
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
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_expense]    Script Date: 19/10/2021 16:48:37 ******/
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
	[expense_date] [date] NULL,
 CONSTRAINT [PK_User_expense] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_income]    Script Date: 19/10/2021 16:48:37 ******/
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
	[income_date] [date] NULL,
 CONSTRAINT [PK_User_income] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Amuta] ON 

INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (1, N'gemachChildren', 0.01)
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (2, N'gemachMercazi', 0.03)
INSERT [dbo].[Amuta] ([id_amuta], [name_amuta], [ribit]) VALUES (3, N'gemachBeyachad', 0.04)
SET IDENTITY_INSERT [dbo].[Amuta] OFF
GO
SET IDENTITY_INSERT [dbo].[Amuta_deposits] ON 

INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (1, 1, N'be666ppp', 200, CAST(N'2012-04-12' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (2, 2, N'be666ppp', 450, CAST(N'2017-07-08' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (3, 3, N'ch333mmm', 800, CAST(N'2016-11-05' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (4, 1, N'da222ggg', 600, CAST(N'2019-05-24' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (5, 2, N'ch333mmm', 350, CAST(N'2014-04-04' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (6, 3, N'ch333mmm', 120, CAST(N'2020-02-07' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (7, 1, N'ch333mmm', 350, CAST(N'2013-08-16' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (8, 2, N'da222ggg', 200, CAST(N'2021-04-20' AS Date))
INSERT [dbo].[Amuta_deposits] ([id_deposit], [id_amuta], [id_user], [sum], [dateOfDeposit]) VALUES (9, 3, N'be666ppp', 700, CAST(N'2015-11-03' AS Date))
SET IDENTITY_INSERT [dbo].[Amuta_deposits] OFF
GO
SET IDENTITY_INSERT [dbo].[Expenses] ON 

INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (1, N'כלכלת בית')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (2, N'רפואה')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (3, N'ביטוחים')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (4, N'לימודים')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (5, N'פנאי')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (6, N'מתנות')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (7, N'ביגוד')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (8, N'טלפון')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (9, N'מים')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (10, N'חשמל')
INSERT [dbo].[Expenses] ([id_expense], [name_expense]) VALUES (11, N'גז')
SET IDENTITY_INSERT [dbo].[Expenses] OFF
GO
SET IDENTITY_INSERT [dbo].[Income] ON 

INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (1, N'משכורת')
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (2, N'מענק')
INSERT [dbo].[Income] ([id_income], [name_income]) VALUES (3, N'הכנסה לא רשמית')
SET IDENTITY_INSERT [dbo].[Income] OFF
GO
SET IDENTITY_INSERT [dbo].[Kinds] ON 

INSERT [dbo].[Kinds] ([id_kind], [name_kind]) VALUES (1, N'קבועות')
INSERT [dbo].[Kinds] ([id_kind], [name_kind]) VALUES (2, N'משתנות')
SET IDENTITY_INSERT [dbo].[Kinds] OFF
GO
SET IDENTITY_INSERT [dbo].[Loans] ON 

INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (1, N'be666ppp', CAST(N'2013-05-20' AS Date), 30000, 8, 0.01, 60)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (2, N'be666ppp', CAST(N'2014-07-01' AS Date), 4000, 12, 0.02, 20)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (3, N'ch333mmm', CAST(N'2018-04-04' AS Date), 12000, 10, 0.01, 30)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (4, N'ch333mmm', CAST(N'2019-04-26' AS Date), 3000, 1, 0.03, 14)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (5, N'ch333mmm', CAST(N'2018-05-08' AS Date), 3000, 8, 0.02, 14)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (6, N'da222ggg', CAST(N'2016-01-21' AS Date), 50000, 36, 0.01, 60)
INSERT [dbo].[Loans] ([id_loan], [id_user], [date_ofLoan], [sum], [prisa], [ribit], [days_toGetMailAlert]) VALUES (7, N'da222ggg', CAST(N'2015-02-02' AS Date), 15000, 15, 0.01, 60)
SET IDENTITY_INSERT [dbo].[Loans] OFF
GO
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email]) VALUES (N'be666ppp', N'beni peach', N'078788787', 8000, N'peach@gmail.com')
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email]) VALUES (N'ch333mmm', N'chana melon', N'078788766', 20000, N'melon@gmail.com')
INSERT [dbo].[User] ([id_user], [name_user], [tel], [misgeret], [email]) VALUES (N'da222ggg', N'david grape', N'078788785', 15000, N'grape@gmail.com')
GO
SET IDENTITY_INSERT [dbo].[User_expense] ON 

INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (1, 5, 2, N'be666ppp', 5000, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (2, 6, 2, N'be666ppp', 400, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (3, 7, 2, N'be666ppp', 1200, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (4, 1, 1, N'be666ppp', 800, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (5, 4, 1, N'ch333mmm', 250, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (6, 1, 1, N'ch333mmm', 600, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (7, 2, 1, N'da222ggg', 300, NULL)
INSERT [dbo].[User_expense] ([id], [id_expense], [id_kind], [id_user], [sum], [expense_date]) VALUES (8, 3, 1, N'da222ggg', 550, NULL)
SET IDENTITY_INSERT [dbo].[User_expense] OFF
GO
SET IDENTITY_INSERT [dbo].[User_income] ON 

INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (1, 1, 1, N'be666ppp', 8000, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (2, 1, 1, N'be666ppp', 7900, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (3, 3, 2, N'be666ppp', 120, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (4, 1, 1, N'ch333mmm', 12000, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (5, 1, 1, N'ch333mmm', 12100, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (6, 1, 1, N'ch333mmm', 11000, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (7, 2, 2, N'ch333mmm', 320, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (8, 2, 2, N'ch333mmm', 450, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (9, 1, 1, N'da222ggg', 10000, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (10, 3, 1, N'da222ggg', 130, NULL)
INSERT [dbo].[User_income] ([id], [id_income], [id_kind], [id_user], [sum], [income_date]) VALUES (11, 3, 1, N'da222ggg', 250, NULL)
SET IDENTITY_INSERT [dbo].[User_income] OFF
GO
ALTER TABLE [dbo].[Amuta_deposits]  WITH CHECK ADD FOREIGN KEY([id_amuta])
REFERENCES [dbo].[Amuta] ([id_amuta])
GO
ALTER TABLE [dbo].[Amuta_deposits]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
GO
ALTER TABLE [dbo].[Loans]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id_user])
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
