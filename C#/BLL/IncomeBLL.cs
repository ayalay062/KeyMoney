using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;



using DAL;using DTO;
namespace BLL
{
   public static class IncomeBLL
    {
       public static List<IncomeDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Income.ToList();
                return IncomeConvertion.convertToListDto(ads);

            }
        }

       public static IncomeDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Income.FirstOrDefault(r => r.id_income == id);
                if (ads == null)
                {
                    return null;
                }
                return IncomeConvertion.convertToDto(ads);

            }
        }


       public static IncomeDto GetByName(string Income_desc)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Income.FirstOrDefault(d => d.name_income == Income_desc);
                if (ads == null)
                {
                    return null;
                }
                return IncomeConvertion.convertToDto(ads);

            }
        }

       public static IncomeDto AddIncome(IncomeDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = IncomeConvertion.convertToIncome(a);
                var ads = db.Income.Add(ad);
                db.SaveChanges();
                return IncomeConvertion.convertToDto(ads);

            }
        }
       public static IncomeDto UpdateIncome(IncomeDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                Income a = db.Income.FirstOrDefault(u => u.id_income == aa.id_income);
                if (a != null)
                {
                    a.name_income = aa.name_income;
                    db.SaveChanges();
                    return IncomeConvertion.convertToDto(a);
                }

                return null;
            }
        }
       public static bool DeleteIncome(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Income a = db.Income.FirstOrDefault(u => u.id_income == id);
                if (a != null)
                {
                    db.Income.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }
}
