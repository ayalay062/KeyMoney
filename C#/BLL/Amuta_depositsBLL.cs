using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DAL;using DTO;
namespace BLL
{
   public static class Amuta_depositsBLL
    {
       
        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
       public static List<Amuta_depositsDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.ToList();
                return Amuta_depositsConvertion.convertToListDto(ads);

            }
         }
       public static Amuta_depositsDto GetByUserId(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.FirstOrDefault(r => r.id_user == id);
                return Amuta_depositsConvertion.convertToDto(ads);

            }
        }


       public static int GetCountAllUserDeposits(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var c = db.Amuta_deposits.Where(r => r.id_user == id).Count();
                return c;

            }
        }

       public static Amuta_depositsDto AddAmutaDeposits(Amuta_depositsDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = Amuta_depositsConvertion.convertToAmuta_deposits(a);
                var ads = db.Amuta_deposits.Add(ad);
                db.SaveChanges();
                return Amuta_depositsConvertion.convertToDto(ads);

            }
        }
    }
}
