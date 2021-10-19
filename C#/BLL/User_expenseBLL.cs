using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;


using DAL;using DTO;
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




       public static User_expenseDto AddUser_expense(User_expenseDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
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