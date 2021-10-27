using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;


using DAL;
using DTO;
namespace BLL
{
    public static class User_expenseBLL
    {
        public static List<User_expenseDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_expense.ToList();
                return User_expenseConvertion.convertToListDto(ads);

            }
        }


        public static List<User_expenseDto> GetAllByUserDate(int year, int month, string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_expense.Where(r => r.id_user == id && r.expense_date.Year == year && r.expense_date.Month == month)
                    .OrderBy(x => x.expense_date).ToList();
                if (ads == null)
                {
                    return null;
                }
                return User_expenseConvertion.convertToListDto(ads);

            }
        }


        public static User_expenseDto GetByUserId(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_expense.FirstOrDefault(r => r.id_user == id);
                if (ads == null)
                {
                    return null;
                }
                return User_expenseConvertion.convertToDto(ads);

            }
        }


        public static User_expenseDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_expense.FirstOrDefault(r => r.id == id);
                if (ads == null)
                {
                    return null;
                }
                return User_expenseConvertion.convertToDto(ads);

            }
        }


        public static User_expenseDto AddUser_expense(User_expenseDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var exVal = 0;
                var ex = db.User_expense.Where(r => r.id_user == a.id_user &&
               r.expense_date.Year == a.expense_date.Year && r.expense_date.Month == a.expense_date.Month)
                 .ToList();

                if (ex != null && ex.Any())
                {
                    exVal = ex.Sum(x => x.sum);
                }
                var userMisgeret = db.User.FirstOrDefault(x => x.id_user == a.id_user);
                if (userMisgeret.misgeret < (exVal + a.sum))
                {
                    //send email
                    EmailBLL.SendEmail(new EmailModel()
                    {
                        toemail = userMisgeret.email,
                        isResetPassword = false,
                        toname = userMisgeret.name_user,
                        message = "בוצעה בקשה להוספת הוצאה על סך " + a.sum + ".שח, ההוצאה חורגת ממסגרת התקציב שלך ",
                        subject = "אזהרה! חריגה מהמסגרת"
                    });

                }

                var ad = User_expenseConvertion.convertToUser_expense(a);
                var ads = db.User_expense.Add(ad);
                db.SaveChanges();
                return User_expenseConvertion.convertToDto(ads);

            }
        }
        public static User_expenseDto UpdateUser_expense(User_expenseDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                User_expense a = db.User_expense.FirstOrDefault(u => u.id == aa.id);
                if (a != null)
                {
                    a.sum = aa.sum;
                    a.expense_info = aa.expense_info;
                    a.expense_date = aa.expense_date;
                    a.id_kind = aa.id_kind;
                    db.SaveChanges();
                    return User_expenseConvertion.convertToDto(a);
                }

                return null;
            }
        }
        public static bool DeleteUser_expense(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                User_expense a = db.User_expense.FirstOrDefault(u => u.id == id);
                if (a != null)
                {
                    db.User_expense.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }



}