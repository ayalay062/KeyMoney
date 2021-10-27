using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;


using DAL;
using DTO;

namespace BLL
{
    public static class ExpensesBLL
    {
        public static List<ExpensesDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Expenses.ToList();
                return ExpensesConvertion.convertToListDto(ads);

            }
        }


    
        public static ExpensesDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Expenses.FirstOrDefault(r => r.id_expense == id);
                if (ads == null)
                {
                    return null;
                }
                return ExpensesConvertion.convertToDto(ads);

            }
        }


        public static ExpensesDto GetByName(string Expenses_desc)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Expenses.FirstOrDefault(d => d.name_expense == Expenses_desc);
                if (ads == null)
                {
                    return null;
                }
                return ExpensesConvertion.convertToDto(ads);

            }
        }

        public static ExpensesDto AddExpenses(ExpensesDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
              
                var ad = ExpensesConvertion.convertToExpenses(a);
                var ads = db.Expenses.Add(ad);
                db.SaveChanges();
                return ExpensesConvertion.convertToDto(ads);

            }
        }
        public static ExpensesDto UpdateExpenses(ExpensesDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                Expenses a = db.Expenses.FirstOrDefault(u => u.id_expense == aa.id_expense);
                if (a != null)
                {
                    a.name_expense = aa.name_expense;
                    db.SaveChanges();
                    return ExpensesConvertion.convertToDto(a);
                }

                return null;
            }
        }
        public static bool DeleteExpenses(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Expenses a = db.Expenses.FirstOrDefault(u => u.id_expense == id);
                if (a != null)
                {
                    db.Expenses.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }
}
