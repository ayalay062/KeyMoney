using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DAL;
using DTO;
namespace BLL
{
    public static class GraphBLL
    {


        //  גרף הוצאות של משתמש לפי חודשים 
        public static List<string> GetMonthsByYear(string id_user, int year)
        {
            //
            using (var db = new KeyMoneyEntities())
            {
                //שליפת ההוצאות של המשתמש לפי שנה
                var allUExpenses = db.User_expense
                      .Where(o => o.id_user == id_user &&
                     o.expense_date.Year == year);
                //קיבוץ עי החודש בשנה
                var m = from allUexp in allUExpenses
                        group allUexp by allUexp.expense_date.Month;
                //שליפת ההכנסות של המשתמש לפי שנה
                var allIncomes = db.User_income
               .Where(o => o.id_user == id_user &&
               o.income_date.Year == year);
                //קיבוץ הכנסות ע"י החודש
                var n = from alInc in allIncomes
                        group alInc by alInc.income_date.Month;
                //שליפת ההלואות של המשתמש
                var loans = db.Loans.Where(r => r.id_user == id_user).ToList();
                //שליפה של ההשקעות של המשתמש לפי שנה
                var aDep = db.Amuta_deposits
      .Where(o => o.id_user == id_user &&
     o.dateOfDeposit.Year == year);
                //קיבוץ לפי חודש
                var aa = from aDe in aDep
                         group aDe by aDe.dateOfDeposit.Month;
                // מעבר על החודשים ושליפת הערכים המתאימים לכל חודש
                string[] months = new string[13];
                for (int i = 1; i < 13; i++)
                {
                    var e_count = m.FirstOrDefault(allExp => allExp.Key == i);
                    var ex = e_count != null ? e_count.Sum(y => y.sum) : 0;
                    var inc_count = n.FirstOrDefault(a => a.Key == i);
                    var inc = inc_count != null ? inc_count.Sum(y => y.sum) : 0;
                    var eaa_count = aa.FirstOrDefault(add => add.Key == i);
                    var deps = eaa_count != null ? eaa_count.Sum(y => y.sum) : 0;

                    var loansv = 0;
                    //שליפה וחישוב הלוואות ששתאריך ההתחלה והסוף מכילים את החודש הנוכחי
                    foreach (var loan in loans)
                    {
                        var endOfMonth = new DateTime(year,
                                   i,
                                   DateTime.DaysInMonth(year,
                                                        i));

                        if (loan.date_ofLoan.AddMonths(loan.prisa) >= endOfMonth
                            && loan.date_ofLoan <= endOfMonth)
                        {
                            //חישוב ההלואה על פי פריסה וריבית
                            loansv = (int)(Math.Round((loan.sum * (1 + (loan.ribit / 100))) / loan.prisa));
                        }
                    }
                    //החזרת מערך עם 12 אברים עבור כל חודש המכיל את כל 4 הפרמטרים לכל חודש
                    months[i - 1] = ex + "," + deps + "," + loansv + "," + inc;
                }
                return months.ToList();
            }
        }

        // מיון הכנסות/ הוצאות לפי קטגוריה
        public static List<int> GetCategory(string id_user, bool ctgry)
        {
            using (var db = new KeyMoneyEntities())
            {
                var allUExpenses = db.User_expense.Where(o => o.id_user == id_user);


                var e = from allUExp in allUExpenses
                        group allUExp by allUExp.id_expense;

                var cat = db.Expenses.Count();
                int[] expenses = new int[cat];

                for (int i = 0; i < cat; i++)
                {
                    var id_expense = db.Expenses.ToList()[i].id_expense;
                    var e_count = e.FirstOrDefault(allExp => allExp.Key == id_expense);
                    expenses[i] = e_count != null ? e_count.Sum(x => x.sum) : 0;
                }
                return expenses.ToList();
            }
        }

        // הוצאות של משתמש לפי שנות פעילות
        public static List<int> GetYears(string id_user, bool p)
        {
            //מטבלת ההוצאות של כל המשתמשים, מבקשים לשלוף רק את ההוצאות של המשתמש עם הסיסמה שהתקבלה
            using (var db = new KeyMoneyEntities())
            {
                var allUExpenses = db.User_expense.Where(o => o.id_user == id_user);

                //קיבוץ הוצאות לפי שנים
                var y = from allUexp in allUExpenses
                        group allUexp by allUexp.expense_date.Year;

                //למצוא את השנה המינימלית והמקסימלית של המשתמש, בשביל טווח
                int maxYear = y.Max(m => m.Key);
                int minYear = y.Min(m => m.Key);

                int size = maxYear - minYear;
                int[] years = new int[size];

                foreach (var item in y)
                {
                    years[minYear] = item.Count();
                    minYear++;
                }

                return years.ToList();
            }
        }


    }
}
