using DAL;using DTO;

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
                r.id_user == id && r.income_date.HasValue && r.income_date.Value.Year == year &&
                r.income_date.Value.Month == month).ToList();

                if (inc != null && inc.Any())
                {
                    incVal = inc.Sum(x => x.sum);
                }
                var exVal = 0;
                var ex = db.User_expense.Where(r => r.id_user == id &&
                r.expense_date.HasValue && 
                r.expense_date.Value.Year == year && r.expense_date.Value.Month == month)
                .ToList();

                if (ex != null && ex.Any())
                {
                    exVal = ex.Sum(x => x.sum);
                }
                return incVal - exVal;
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
                User userDB = db.User.FirstOrDefault(u => (u.email == user.email || u.name_user == user.email) && u.id_user == user.id_user);
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