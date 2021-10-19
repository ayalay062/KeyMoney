using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;


using DAL;using DTO;
namespace BLL
{
   public static class User_incomeBLL
    {
       public static List<User_incomeDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_income.ToList();
                return User_incomeConvertion.convertToListDto(ads);

            }
        }

       public static User_incomeDto GetByUserId(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.User_income.FirstOrDefault(r => r.id_user == id);
                if (ads == null)
                {
                    return null;
                }
                return User_incomeConvertion.convertToDto(ads);

            }
        }




       public static User_incomeDto AddUser_income(User_incomeDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = User_incomeConvertion.convertToUser_income(a);
                var ads = db.User_income.Add(ad);
                return User_incomeConvertion.convertToDto(ads);

            }
        }
       public static User_incomeDto UpdateUser_income(User_incomeDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                User_income a = db.User_income.FirstOrDefault(u => u.id == aa.id);
                if (a != null)
                {
                    a.sum = aa.sum;

                    db.SaveChanges();
                    return User_incomeConvertion.convertToDto(a);
                }

                return null;
            }
        }
       public static bool DeleteUser_income(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                User_income a = db.User_income.FirstOrDefault(u => u.id == id);
                if (a != null)
                {
                    db.User_income.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }



}