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
        public static List<UserDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User.ToList();
                return UserConvertion.convertToListDto(ads);

            }
        }

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

        public static double CalculateSum(int year, int month, string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var incVal = 0;
                var inc = db.User_income.Where(r =>
          r.income_date.Year == year &&
                r.income_date.Month == month).ToList();

                if (inc != null && inc.Any())
                {
                    incVal = inc.Sum(x => x.sum);
                }
                var exVal = 0;
                var ex = db.User_expense.Where(r => r.id_user == id &&
              r.expense_date.Year == year && r.expense_date.Month == month)
                .ToList();

                var loansValues = 0.0;

                var endOfMonth = new DateTime(year,
                                 month,
                                 DateTime.DaysInMonth(year,
                                                      month));
                var loans = db.Loans.Where(r => r.id_user == id).ToList();
                foreach (var loan in loans)
                {
                    if (loan.date_ofLoan.AddMonths(loan.prisa) >= endOfMonth && loan.date_ofLoan <= endOfMonth)
                    {
                  
                        loansValues += Math.Round((loan.sum * (1 + (loan.ribit / 100))) / loan.prisa);
                    }
                }
                if (ex != null && ex.Any())
                {
                    exVal = ex.Sum(x => x.sum);
                }
                var amVal = 0;
                var am = db.Amuta_deposits.Where(r => r.id_user == id && r.dateOfDeposit.Year == year && r.dateOfDeposit.Month == month)
             .OrderBy(x => x.dateOfDeposit).ToList();
                if (am != null && am.Any())
                {
                    amVal = am.Sum(x => x.sum);
                }

                return incVal - exVal - loansValues - amVal;
            }
        }

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