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
                var ads = db.Loans.Include("Expenses").ToList();
                return LoansConvertion.convertToListDto(ads);
     
    }
        }

       public static List<LoansDto> GetByUserId(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Loans.Where(r => r.id_user == id).ToList() ;
                if (ads == null)
                {
                    return null;
                }
                return LoansConvertion.convertToListDto(ads);

            }
        }
        public static LoansDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Loans.FirstOrDefault(r => r.id_loan == id);
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
                db.SaveChanges();
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
                    l.date_ofLoan = loan.date_ofLoan;
                    l.days_toGetMailAlert = loan.days_toGetMailAlert;
                    l.id_expense = loan.id_expense;
                    db.SaveChanges();
                    return LoansConvertion.convertToDto(l);
                }

                return null;
            }
        }
   
       public static bool DeleteLoans(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Loans a = db.Loans.FirstOrDefault(u => u.id_loan == id);
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
