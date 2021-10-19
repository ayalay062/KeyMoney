using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;



using DAL;using DTO;
namespace BLL
{
   public static class LoansBLL
    {
       public static List<LoansDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Loans.ToList();
                return LoansConvertion.convertToListDto(ads);

            }
        }

       public static LoansDto GetById(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Loans.FirstOrDefault(r => r.id_user == id);
                if (ads == null)
                {
                    return null;
                }
                return LoansConvertion.convertToDto(ads);

            }
        }
       public static LoansDto AddLoans(LoansDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = LoansConvertion.convertToLoans(a);
                var ads = db.Loans.Add(ad);
                return LoansConvertion.convertToDto(ads);

            }
        }
       public static LoansDto UpdateLoans(LoansDto loan)
        {
            using (var db = new KeyMoneyEntities())
            {
                Loans l = db.Loans.FirstOrDefault(u => u.id_user == loan.id_user);
                if (l != null)
                {
                    l.prisa = loan.prisa;
                    l.ribit = loan.ribit;
                    l.sum = loan.sum;
                    db.SaveChanges();
                    return LoansConvertion.convertToDto(l);
                }

                return null;
            }
        }
   
       public static bool DeleteLoans(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Loans a = db.Loans.FirstOrDefault(u => u.id_user == id);
                if (a != null)
                {
                    db.Loans.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }      
    }
}
