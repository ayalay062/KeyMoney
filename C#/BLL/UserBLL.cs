using DAL;
using DTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace BLL
{
    public static class UserBLL
    {
        //שליפה של כל המשתמשים מהמסד נתונים ללא משתמשי מנהל
        public static List<UserDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User.Where(x => x.is_admin == false).ToList();
                return UserConvertion.convertToListDto(ads);

            }
        }
        //קבלת משתמש ע"י המזהה שלו
        public static UserDto GetById(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User.FirstOrDefault(r => r.id_user == id);
                if (ads == null)
                {
                    return null;
                }
                return UserConvertion.convertToDto(ads);

            }
        }

        //קבלת משתמש ע"י השם שלו
        public static UserDto GetByName(string user_desc)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User.FirstOrDefault(d => d.name_user == user_desc);
                if (ads == null)
                {
                    return null;
                }
                return UserConvertion.convertToDto(ads);

            }
        }
        //הוספת משתמש למערכת
        public static UserDto AddUser(UserDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var user = db.User.FirstOrDefault(d => d.id_user == a.id_user);
                if (user != null)
                    return null;
                var ad = UserConvertion.convertToUser(a);
                var ads = db.User.Add(ad);
                db.SaveChanges();
                return UserConvertion.convertToDto(ads);

            }
        }
        //חישוב סך הוצאות והכנסות למשתמש על פי חודש ושנה
        public static double CalculateSum(int year, int month, string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var incVal = 0;
                //שליפה של כל ההכנסות לפי חודש ושנה
                var inc = db.User_income.Where(r =>
          r.income_date.Year == year && r.id_user == id &&
                r.income_date.Month == month).ToList();

                if (inc != null && inc.Any())
                {
                    incVal = inc.Sum(x => x.sum);
                }
                var exVal = 0;
                //שליפה של כל ההוצאות לפי חודש ושנה
                var ex = db.User_expense.Where(r => r.id_user == id &&
              r.expense_date.Year == year && r.expense_date.Month == month)
                .ToList();

                var loansValues = 0.0;

                var endOfMonth = new DateTime(year,
                                 month,
                                 DateTime.DaysInMonth(year,
                                                      month));
                // שליפה של כל ההלואות של המשתמש
                var loans = db.Loans.Where(r => r.id_user == id).ToList();
                //חישוב סך חודשי של ההלןואה להללואות שבטווח תאריך של החודש והשנה
                foreach (var loan in loans)
                {
                    if (loan.date_ofLoan.AddMonths(loan.prisa) >= endOfMonth && loan.date_ofLoan <= endOfMonth)
                    {
                        //חישוב סכום ההלואה החודשי לפי ריבית ופריסה לתשלומים
                        loansValues += Math.Round((loan.sum * (1 + (loan.ribit / 100))) / loan.prisa);
                    }
                }
                if (ex != null && ex.Any())
                {
                    exVal = ex.Sum(x => x.sum);
                }
                var amVal = 0;
                // שליפה של כל העמותות להשקעה שהמשתמש השקיע בחודש ובשנה שנבחרו
                var am = db.Amuta_deposits.Where(r => r.id_user == id && r.dateOfDeposit.Year == year && r.dateOfDeposit.Month == month)
             .OrderBy(x => x.dateOfDeposit).ToList();
                if (am != null && am.Any())
                {
                    amVal = am.Sum(x => x.sum);
                }
                // חישוב סך הכנסות - הוצאות - הלוואות - השקעות
                return incVal - exVal - loansValues - amVal;
            }
        }
        //עדכון משתמש במערכת
        public static UserDto UpdateUser(UserDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                User a = db.User.FirstOrDefault(u => u.id_user == aa.id_user);
                if (a != null)
                {
                    a.email = aa.email;
                    a.tel = aa.tel;
                    a.id_user = aa.id_user;
                    a.misgeret = aa.misgeret;
                    a.name_user = aa.name_user;
                    db.SaveChanges();
                    return UserConvertion.convertToDto(a);
                }

                return null;
            }
        }
        //שינוי הסטטוס של המשתמש
        public static UserDto SetStatusUser(string userId, bool isEnable)
        {
            using (var db = new KeyMoneyEntities())
            {
                User a = db.User.FirstOrDefault(u => u.id_user == userId);
                if (a != null)
                {
                    a.is_disabled = !isEnable;
                    db.SaveChanges();
                    return UserConvertion.convertToDto(a);
                }

                return null;
            }
        }
        // התחברות למערכת
        public static UserDto Login(UserDto user)
        {
            using (var db = new KeyMoneyEntities())
            {
                User userDB =
                    db.User.Include("Amuta").FirstOrDefault(u => (u.email == user.email || u.name_user == user.email) && u.id_user == user.id_user);
                if (userDB == null) return null;
                return UserConvertion.convertToDto(userDB);

            }

        }
        //מחיקת משתמש
        public static bool DeleteUser(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                User a = db.User.FirstOrDefault(u => u.id_user == id);
                if (a != null)
                {
                    db.User.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }

}